// import { API_LOCAL, URL_BASE_API_BACKEND } from '@/store/config';
import { ButtonAddFile, ButtonAddFile2 } from './components/buttons/button';
import { ContentFiles } from './components/files/contentfiles';
import { InputSearchFile } from './components/search/search';

// const fetching = async () => {
// 	const res = await fetch(API_LOCAL + '/files/getFiles', { cache: 'no-store' })
// 		.then(res => res.json())
// 		.catch(err => {
// 			console.log(err);
// 		});
// 	return (
// 		res || {
// 			records: {
// 				cant: 10,
// 				limit: 100,
// 			},
// 			results: [],
// 		}
// 	);
// };
export const GestionDeArchivos = () => {
	// const data = await fetching();
	return (
		<div className='_manage_files'>
			<h1 className='title bold mb-1 text-letter'>Administrador de archivos</h1>
			<p className='paragraph mb-3 color1'>Sube tus archivos mp3, mp4, jpg ,png, webp, svg. etc, los archivos deben pesar menos de 10mb, no se admiten archivos con peso mayor a 100mb</p>
			<div className='content-tab flex py-3 border-y border-slate-200 d-flex mb-4 border-solid gap-2'>
				<InputSearchFile />
				<ButtonAddFile />
				<ButtonAddFile2 />
				{/* 
				<BtnDeleteFile /> */}
			</div>
			{/* <ContentFiles data={data} /> */}
		</div>
	);
};
