import { useEffect, useState } from 'react';
import { setInputTextProps } from '../../../common/form';
import { obsModal } from '../modal/obsModal';
import { obsFileManager } from '../../../home/dashboard/gestion-de-archivos/obsFileManager';
import { generateId, generateUrl } from '../../../common/helpers';
import { generatePath } from 'react-router';
import { IFile, IFileSelected } from '../../../common/interface';
import { BASE_API, BASE_API_LOCAL } from '../../../store/config';

export const InputAddImage = ({ name, form, galleryId }: { name: string; form?: any; galleryId: string }) => {
	const [image, setImage] = useState<IFile>();
	const id = generateId({ type: 'string' });
	const eventOpenModal = () => {
		obsModal.next({ [galleryId]: { value: true, fn: setImage } });
		obsFileManager.next({ [id]: { fn: setImage } });
	};
	useEffect(() => {
		const manager = obsFileManager.subscribe(data => {
			console.log('INPUT_IMAGE', data);
		});
		return () => {
			manager.unsubscribe();
		};
	}, []);
	return (
		<div
			className='py-0 bg-[#8ab2ff21] flex flex-col items-center justify-center gap-4 border-dashed border-2 border-[#2d4166] rounded-lg relative cursor-pointer h-[8rem]'
			onClick={() => {
				eventOpenModal();
			}}
		>
			<div className='rounded-full w-8 h-8 bg-primary flex items-center justify-center absolute top-0 right-0 translate-x-1/2 -translate-y-1/2'>
				<div className='mask-center icon-plus w-1/2 h-1/2 bg-white'></div>
			</div>
			<input type='text' value='' className='sr-only peer hidden' {...setInputTextProps(name, form)} />
			{(image && <img className='w-full h-full object-cover' src={generateUrl(image, BASE_API)} />) || <span className='text-primary'>Agregar imagen</span>}
		</div>
	);
};
