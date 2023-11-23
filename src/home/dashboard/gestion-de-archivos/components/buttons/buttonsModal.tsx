import { toggleModal } from '@/app/dashboard/components/modalupload/modalupload.slice';
import { useDispatch } from 'react-redux';

export const BtnAddFile = () => {
	const dispatch = useDispatch();
	return (
		<div
			onClick={() => {
				dispatch(toggleModal(true));
			}}
			className='cursor-pointer h-10 w-max bg-success p-4 text-white flex items-center justify-center border-4 rounded-md'
		>
			Subir un archivo
		</div>
	);
};
