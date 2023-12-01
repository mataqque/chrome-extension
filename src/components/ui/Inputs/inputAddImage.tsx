import { useEffect, useRef, useState } from 'react';
import { setInputTextProps } from '../../../common/form';
import { obsModal } from '../modal/obsModal';
import { obsFileManager } from '../../../home/dashboard/gestion-de-archivos/obsFileManager';
import { delayfunc, dispatchEvent, dispatchEventSelect, generateId, generateUrl } from '../../../common/helpers';
import { generatePath } from 'react-router';
import { IFile, IFileSelected } from '../../../common/interface';
import { BASE_API, BASE_API_LOCAL } from '../../../store/config';
import { useField } from 'formik';
interface IProps {
	name: string;
	form?: any;
	galleryId: string;
	defaultValue?: string;
}
export const InputAddImage = (props: IProps) => {
	const [field, meta, helpers] = useField(props);
	const [image, setImage] = useState<IFile>();
	const ref = useRef<HTMLInputElement>(null);
	const id = generateId({ type: 'string' });
	const eventFn = (data: IFileSelected) => {
		setImage(data);
		helpers.setValue(data.uuid);
	};
	const eventOpenModal = () => {
		obsModal.next({ [props.galleryId]: { value: true } });
		obsFileManager.next({ [id]: { fn: eventFn } });
	};
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
			<input type='text' className='hidden' autoComplete='off' tabIndex={0} {...field} ref={ref} />
			{(image && image.uuid == field.value && <img className='w-full h-full object-cover' src={generateUrl(image, BASE_API)} />) || <span className='text-primary'>Agregar imagen</span>}
		</div>
	);
};
