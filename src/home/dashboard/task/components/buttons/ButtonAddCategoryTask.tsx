import { obsModal } from '../../../../../components/ui/modal/obsModal';

export const ButtonAddCategoryTask = () => {
	const openPopup = () => {
		obsModal.next({ ['popupNote']: true });
	};
	return (
		<div
			className='cursor-pointer h-10 w-max bg-success p-4 text-white flex items-center justify-center rounded-md select-none'
			onClick={() => {
				openPopup();
			}}
		>
			Agregar Categoría
		</div>
	);
};
