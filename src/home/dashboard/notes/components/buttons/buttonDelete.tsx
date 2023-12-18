import { useSelector } from 'react-redux';
import { useCategoriesMutation, useDeleteCategoryMutation } from '../../../../../store/api/categoryApi';
import { useDispatch } from 'react-redux';
import { updateCategories } from '../../../../../store/slice/categorySlice';

export const ButtonDeleteTask = () => {
	const eventDelete = async () => {};
	return (
		<div
			className='cursor-pointer h-10 w-max bg-danger p-4 text-white flex items-center justify-center rounded-md'
			onClick={() => {
				eventDelete();
			}}
		>
			Eliminar
		</div>
	);
};
