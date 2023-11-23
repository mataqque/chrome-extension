import { useContext } from 'react';
import { ModalContext } from '../../../../../components/ui/modal/modal';
import { obsModal } from '../../../../../components/ui/modal/obsModal';

export const ButtonAddFile = () => {
	const { onClose } = useContext(ModalContext);
	const openModal = () => {
		obsModal.next({
			['modalupload']: true,
		});
	};
	return (
		<div
			className='cursor-pointer h-10 w-max bg-success p-4 text-white flex items-center justify-center rounded-md'
			onClick={() => {
				openModal();
			}}
		>
			Subir un archivo
		</div>
	);
};
