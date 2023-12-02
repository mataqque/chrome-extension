import { createContext, useContext, useEffect, useState } from 'react';
import { ButtonAddFile } from './components/buttons/buttonUpload';
import { InputSearchFile } from './components/search/search';
import { IFile, IFileSelected, IResFiles } from '../../../common/interface';
import { addShy, delayfunc, generateUrl } from '../../../common/helpers';
import { useDispatch } from 'react-redux';
// import { fetching } from './fetching';
import { ButtonDeleteFile } from './components/buttons/buttonDelete';
import { selectMultiplyFile, selectSingleFile, updateFiles } from '../../../store/slice/file_managerSlice';
import { useSelector } from 'react-redux';
import { useGetFilesMutation } from '../../../store/api/filesApi';
import { BASE_API, BASE_API_LOCAL } from '../../../store/config';
import { ButtonOpenFolder } from './components/buttons/buttonOpenFolder';
import { ButtonEvent } from './components/buttons/buttonEvent';
import { obsFileManager } from './obsFileManager';

/**
 * type modal | page
 * @type {string}
 */
type TypeManage = 'modal' | 'page';
export const FileManagerContext = createContext<{ type: TypeManage }>({ type: 'page' });
export const FileManager = ({ type = 'page' }: { type?: TypeManage }) => {
	const dispatch = useDispatch();
	const [getFiles, { isSuccess }] = useGetFilesMutation<any>();
	const init = async () => {
		await delayfunc(async () => {
			const { data }: any = await getFiles('');
			dispatch(updateFiles(data.data));
		}, 100);
	};
	useEffect(() => {
		(async () => {
			await init();
		})();
	}, []);
	return (
		<FileManagerContext.Provider value={{ type }}>
			<div className='flex flex-col h-full w-full'>
				<h1 className='text-1/4 bold mb-1 text-primary'>Administrador de archivos</h1>
				<p className='paragraph mb-3 text-letter'>
					Sube tus archivos mp3, mp4, jpg ,png, webp, svg. etc, los archivos deben pesar menos de 10mb, no se admiten archivos con peso mayor a 100mb
				</p>
				<div className='content-tab flex py-3 border-y border-slate-200 d-flex border-solid gap-2 flex-wrap xsm:flex-no-wrap'>
					<InputSearchFile />
					<ButtonAddFile />

					{type == 'page' ? (
						<>
							<ButtonDeleteFile /> <ButtonOpenFolder />{' '}
						</>
					) : null}
					{type == 'modal' && <ButtonEvent />}
				</div>
				<ContentFiles />
			</div>
		</FileManagerContext.Provider>
	);
};

function ContentFiles() {
	const files = useSelector((state: any) => state.filesManageSlice.files);
	return (
		<div className='w-[calc(100%+2rem)] translate-x-[-1rem] h-max overflow-auto  '>
			<div className='grid grid-cols-[repeat(auto-fill,minmax(13rem,1fr))] gap-4 h-full scroll grid-rows-[repeat(3,max-content)] scroll pt-4 px-4'>
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
	const context = useContext(FileManagerContext);
	const dispatch = useDispatch();
	const filesSelected = useSelector((state: any) => state.filesManageSlice.filesSelected);
	const handled = (file: IFileSelected) => {
		if (context.type == 'modal') {
			dispatch(selectSingleFile(file));
		} else {
			dispatch(selectMultiplyFile(file));
		}
	};
	return (
		<div
			className={`w-full  h-full  p-4 rounded-[1rem] select-none cursor-pointer shadow-1 bg-[#f8f9ff] [&.active]:bg-primary flex flex-col group ${filesSelected.includes(file) ? 'active' : ''}`}
			onClick={() => handled(file)}
		>
			<div className='w-full rounded-lg overflow-hidden h-[7.3rem] mb-2 select-none'>
				<img src={generateUrl(file, BASE_API)} alt='' className='w-full h-full object-cover select-none' />
			</div>
			<span className='text-primary select-none text-0/8 group-[&.active]:text-white'>{addShy(file.fileName)}</span>
		</div>
	);
}
