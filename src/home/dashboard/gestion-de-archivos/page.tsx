// import { API_LOCAL, URL_BASE_API_BACKEND } from '@/store/config';
import { useEffect, useState } from 'react';
import { API_LOCAL } from '../../config';
import { ButtonAddFile } from './components/buttons/buttonUpload';
import { InputSearchFile } from './components/search/search';
import { IFile, IFileSelected, IResFiles } from '../../../common/interface';
import { generateUrl } from '../../../common/helpers';
import { useDispatch } from 'react-redux';
import { fetching } from './fetching';
import { ButtonDeleteFile } from './components/buttons/buttonDelete';
import { selectFile } from '../../../store/slice/file_managerSlice';
import { useSelector } from 'react-redux';

export const GestionDeArchivos = () => {
	const [data, setData] = useState<IResFiles | null>(null);
	const getData = async () => {
		const res = await fetching();
		setData(res);
	};

	useEffect(() => {
		getData();
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

			<ContentFiles data={data} />
		</div>
	);
};

function ContentFiles({ data }: { data: IResFiles | null }) {
	const [resData, setData] = useState<IResFiles | null>(data);
	useEffect(() => {}, [data]);
	return (
		<div className='w-full h-16'>
			<div className='grid grid-cols-[repeat(auto-fill,minmax(13rem,1fr))] gap-4'>
				{data &&
					data?.results.length > 0 &&
					data?.results.map((file: IFile, index: number) => {
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
			className={`w-full  h-max  p-4 rounded-[1rem] cursor-pointer shadow-1 bg-[#f8f9ff] [&.active]:bg-primary flex flex-col group ${filesSelected.includes(file) ? 'active' : ''}`}
			onClick={() => handled(file)}
		>
			<div className='w-full rounded-lg overflow-hidden h-[7.3rem] mb-2'>
				<img src={generateUrl(file)} alt='' className='w-full h-full object-cover' />
			</div>
			<span className='text-primary text-0/9 group-[&.active]:text-white'>{file.fileName}</span>
		</div>
	);
}
