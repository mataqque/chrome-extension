import { useEffect } from 'react';
import { obsModal } from '../../../../../components/ui/modal/obsModal';

export const ButtonAddTask = () => {
	const openPopup = () => {
		obsModal.next({ ['popupNote']: { value: true } });
	};
	useEffect(() => {
		obsModal.next({ ['popupNote']: { value: true } });
	}, []);
	return (
		<div
			className='cursor-pointer h-10 w-max bg-success p-4 text-white flex items-center justify-center rounded-md select-none'
			onClick={() => {
				openPopup();
			}}
		>
			Agregar Tarea
		</div>
	);
};
