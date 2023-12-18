import { useEffect } from 'react';
import { obsModal } from '../../../../../components/ui/modal/obsModal';
import { initDataCategoryNote, obsCategoryNote } from '../popup/obspopup';

export const ButtonAddCategoryTask = () => {
	const openPopup = () => {
		obsModal.next({ ['popupCategoryNote']: { value: true } });
		obsCategoryNote.next(initDataCategoryNote);
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
