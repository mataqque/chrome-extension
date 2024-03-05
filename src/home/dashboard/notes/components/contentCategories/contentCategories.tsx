import { useDispatch } from 'react-redux';
import { useNotesMutation } from '../../../../../store/api/notesApi';
import { useSelector } from 'react-redux';
import { updateNotes } from '../../../../../store/slice/notesSlide';
import { ICategory, IFile } from '../../../../../common/interface';
import { useCategoriesMutation, useDeleteCategoryMutation, useSubcategoriesMutation } from '../../../../../store/api/categoryApi';
import { selectCategory, updateCategories, updateSubCategories } from '../../../../../store/slice/categorySlice';
import { confirmAction, generateUrl, resumeText } from '../../../../../common/helpers';
import { LazyImage } from '../../../gestion-de-archivos/components/lazyImages/images';
import { BASE_API } from '../../../../../store/config';
import { obsModal } from '../../../../../components/ui/modal/obsModal';
import { obsCategoryNote } from '../popup/obspopup';

export const ContentCategoryNote = () => {
	const dispatch = useDispatch();
	const [getDataNotes, {}] = useNotesMutation();
	const categories = useSelector((state: any) => state.categorySlice.categories);
	const showAllNotes = async () => {
		const resNotes: any = await getDataNotes({ page: 1, cant: 10 });
		dispatch(updateNotes(resNotes.data.data));
	};
	return (
		<div className='min-w-[25rem] w-[25rem] h-max bg-white rounded-xl max-h-[100%] overflow-hidden flex flex-col xsm:relative absolute xsm:w-max  w-full h-full z-[2]'>
			<div className='flex mb-2 pt-4 px-4'>
				<div className='flex items-center'>
					<div className='mask-left icon-notepad w-6 h-6 bg-sixth mr-2'></div>
					<span className='text-sixth text-1/3 leading-none h-max'>Categorías de Notas</span>
				</div>
				<div
					className='w-7 h-7 cursor-pointer border border-solid border-[#b8cad9] rounded-lg flex items-center justify-center ml-auto cursor-pointer hover:bg-primary group duration-300'
					onClick={() => {
						showAllNotes();
					}}
				>
					<div className='w-[60%]  h-[60%] icon-all mask-center bg-primary group-hover:bg-white group-hover:border-primary duration-300'></div>
				</div>
			</div>
			{/* <span className='text-[#3360b1] text-1/1 mb-2 flex'>130 Tareas</span> */}
			<div className='flex flex-col gap-2 scroll overflow-y-auto p-4'>
				{categories?.data?.map((item: any) => {
					return <ItemCategoryNote key={item.uuid} category={item}></ItemCategoryNote>;
				})}
			</div>
		</div>
	);
};

interface IProps extends ICategory {
	image: IFile;
}

const ItemCategoryNote = ({ category }: { category: IProps }) => {
	const [getSubCategories, {}] = useSubcategoriesMutation();
	const [getCategories, {}] = useCategoriesMutation();
	const [deleteCategory, {}] = useDeleteCategoryMutation();
	const [getNotes, {}] = useNotesMutation();
	const dispatch = useDispatch();
	const categoriesSelected = useSelector((state: any) => state.categorySlice.categoriesSelected);
	const handleSelect = async (c: any) => {
		const { data }: any = await getSubCategories({ parent: c.uuid });
		const resNotes: any = await getNotes({ uuid: c.uuid });
		dispatch(updateSubCategories(data.data));
		dispatch(updateNotes(resNotes.data.data));
		dispatch(selectCategory(category));
	};

	const handleEdit = () => {
		obsModal.next({ ['popupCategoryNote']: { value: true } });
		obsCategoryNote.next({
			uuid: category.uuid,
			status: category.status,
			name: category.name,
			description: category.description,
			imageFileId: category.imageFileId || '',
			parentCategoryId: category.parentCategoryId || '',
			image: category.image,
		});
	};
	const handleDelete = async () => {
		confirmAction('¿Seguro que deseas eliminar esta categoria?', async () => {
			const { data }: any = await deleteCategory({ uuid: category.uuid });
			if (data.status) {
				const res: any = await getCategories({ page: 1, cant: 10 });
				if (res.data) {
					dispatch(updateCategories(res.data));
				}
			}
		});
	};
	return (
		<div
			className={`w-full h-[8rem] rounded-xl bg-[#f1f4ff] cursor-pointer hover:bg-[#dce4ff] duration-300 group p-3 flex gap-4 [&.active]:bg-[#dce4ff] relative ${
				categoriesSelected.uuid == category.uuid ? 'active' : ''
			}`}
		>
			<div
				className='w-5 h-5 bg-danger flex items-center justify-center rounded-full absolute top-0 right-0 transform translate-x-[40%] -translate-y-[40%] cursor-pointer'
				onClick={() => handleDelete()}
			>
				<div className='w-[60%] h-[60%] bg-white rounded-full mask-center icon-close'></div>
			</div>
			<div
				className='w-7 h-7 cursor-pointer rounded-full bg-[#3360b1] absolute bottom-3 right-2 flex items-center justify-center'
				onClick={() => {
					handleEdit();
				}}
			>
				<div className='bg-white mask-center icon-edit w-1/2 h-1/2'></div>
			</div>
			<div
				className='w-full h-full flex gap-4'
				onClick={() => {
					handleSelect(category);
				}}
			>
				<LazyImage src={generateUrl(category.image, BASE_API)} class='w-[6rem] min-w-[6rem] h-full rounded-xl overflow-hidden'></LazyImage>
				<div className='flex flex-col gap-2'>
					<span className='text-1/2 text-sixth leading-none'>{category.name}</span>
					<p className='text-sixth text-0/9'>{resumeText(category.description, 40)}</p>
					<div className='flex mt-auto'>
						<div className='text-gray-500 group-hover:text-primary group-hover:bg-white text-0/8 rounded-full bg-gray-100 px-4 h-7 flex items-center duration-300'>hace 4min</div>
					</div>
				</div>
			</div>
		</div>
	);
};
