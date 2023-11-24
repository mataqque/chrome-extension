import { useEffect, useState } from 'react';
import { ButtonAddFile } from './components/buttons/buttonUpload';
import { InputSearchFile } from './components/search/search';
import { IFile, IFileSelected, IResFiles } from '../../../common/interface';
import { addShy, delayfunc, generateUrl } from '../../../common/helpers';
import { useDispatch } from 'react-redux';
// import { fetching } from './fetching';
import { ButtonDeleteFile } from './components/buttons/buttonDelete';
import { selectFile, updateFiles } from '../../../store/slice/file_managerSlice';
import { useSelector } from 'react-redux';
import { useGetFilesMutation } from '../../../store/api/filesApi';

export const GestionDeArchivos = () => {
	const dispatch = useDispatch();
	const [getFiles, { isSuccess }] = useGetFilesMutation<any>();
	const init = async () => {
		await delayfunc(async () => {
			const { data }: any = await getFiles('');
			console.log(data);
			dispatch(updateFiles(data.results));
		}, 1000);
	};
	useEffect(() => {
		(async () => {
			await init();
		})();
	}, []);
	return (
		<div className='_manage_files'>
			<h1 className='title bold mb-1 text-letter'>Administrador de archivos</h1>
			<p className='paragraph mb-3 color1'>Sube tus archivos mp3, mp4, jpg ,png, webp, svg. etc, los archivos deben pesar menos de 10mb, no se admiten archivos con peso mayor a 100mb</p>
			<div className='content-tab flex py-3 border-y border-slate-200 d-flex mb-4 border-solid gap-2'>
				<InputSearchFile />
				<ButtonAddFile />
				<ButtonDeleteFile />
			</div>
			<ContentFiles />
		</div>
	);
};

function ContentFiles() {
	const files = useSelector((state: any) => state.filesManageSlice.files);
	console.log('files', files);
	return (
		<div className='w-full h-16'>
			<div className='grid grid-cols-[repeat(auto-fill,minmax(13rem,1fr))] gap-4'>
				{files &&
					files.length > 0 &&
					files.map((file: IFile, index: number) => {
						return <File file={file} key={'file-' + index}></File>;
					})}
			</div>
		</div>
	);
}

function File({ file }: { file: IFile }) {
	const dispatch = useDispatch();
	const filesSelected = useSelector((state: any) => state.filesManageSlice.filesSelected);
	const handled = (file: IFileSelected) => {
		dispatch(selectFile(file));
	};
	return (
		<div
			className={`w-full  h-full  p-4 rounded-[1rem] cursor-pointer shadow-1 bg-[#f8f9ff] [&.active]:bg-primary flex flex-col group ${filesSelected.includes(file) ? 'active' : ''}`}
			onClick={() => handled(file)}
		>
			<div className='w-full rounded-lg overflow-hidden h-[7.3rem] mb-2'>
				<img src={generateUrl(file)} alt='' className='w-full h-full object-cover' />
			</div>
			<span className='text-primary select-none text-0/9 group-[&.active]:text-white'>{addShy(file.fileName)}</span>
		</div>
	);
}
