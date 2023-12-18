import { useEffect, useRef, useState } from 'react';
import { obsModal } from '../modal/obsModal';
import { obsFileManager } from '../../../home/dashboard/gestion-de-archivos/obsFileManager';
import { generateId, generateUrl } from '../../../common/helpers';
import { IFile, IFileSelected } from '../../../common/interface';
import { BASE_API } from '../../../store/config';
import { useField } from 'formik';
interface IProps {
	name: string;
	form?: any;
	galleryId: string;
	file?: IFile;
}
export const InputAddImage = ({ file, name, galleryId = '' }: IProps) => {
	const [image, setImage] = useState(file);
	const id = generateId({ type: 'string' });
	const [field, meta, helpers] = useField(name);
	const eventFn = (data: IFileSelected) => {
		setImage(data);
		helpers.setValue(data.uuid);
	};
	const eventOpenModal = () => {
		obsModal.next({ [galleryId]: { value: true } });
		obsFileManager.next({ [id]: { fn: eventFn } });
	};
	useEffect(() => {
		setImage(file);
	}, [file]);

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
			<input type='text' className='hidden' autoComplete='off' tabIndex={0} {...field} />
			{(image && image.uuid == field.value && <img className='w-full h-full object-cover' src={generateUrl(image, BASE_API)} />) || <span className='text-primary'>Agregar imagen</span>}
		</div>
	);
};

export const InputAddImage2 = (props: IProps) => {
	const [image, setImage] = useState(props.file);
	console.log({ file: props.file });
	console.log({ image });
	return <div className=''></div>;
};
