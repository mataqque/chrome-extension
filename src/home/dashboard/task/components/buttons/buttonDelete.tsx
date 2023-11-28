import { useSelector } from 'react-redux';
import { useCategoriesMutation, useDeleteCategoryMutation } from '../../../../../store/api/categoryApi';
import { useDispatch } from 'react-redux';
import { updateCategories } from '../../../../../store/slice/categorySlice';

export const ButtonDeleteTask = () => {
	const dispatch = useDispatch();
	const [deleteCategory, {}] = useDeleteCategoryMutation();
	const [getCategories, {}] = useCategoriesMutation();
	const categoriSelected = useSelector((state: any) => state.categorySlice.categoriesSelected);
	const eventDelete = async () => {
		const { data }: any = await deleteCategory({ uuid: categoriSelected.uuid });
		if (data.status) {
			const res: any = await getCategories({ page: 1, cant: 10 });

			if (res.data) {
				dispatch(updateCategories(res.data));
			}
		}
	};
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
