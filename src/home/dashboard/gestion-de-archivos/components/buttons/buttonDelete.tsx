import { useContext } from 'react';
import { ModalContext } from '../../../../../components/ui/modal/modal';
import { obsModal } from '../../../../../components/ui/modal/obsModal';

export const ButtonDeleteFile = () => {
	const handle = () => {};
	return (
		<div
			className='cursor-pointer h-10 w-max bg-danger p-4 text-white flex items-center justify-center rounded-md'
			onClick={() => {
				handle();
			}}
		>
			Subir un archivo
		</div>
	);
};
