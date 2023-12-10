import { useEffect, useMemo, useState } from 'react';
import { useCategoriesMutation, useSubcategoriesMutation } from '../../../store/api/categoryApi';
import { LazyImage } from '../gestion-de-archivos/components/lazyImages/images';
import { ButtonAddCategoryTask } from './components/buttons/ButtonAddCategoryTask';
import { ButtonDeleteTask } from './components/buttons/buttonDelete';
import { SearchInput } from './components/inputs/searchInput';
import { useDispatch } from 'react-redux';
import { selectCategory, updateCategories, updateSubCategories } from '../../../store/slice/categorySlice';
import { useSelector } from 'react-redux';
import { ButtonAddTask } from './components/buttons/buttonAddTask';
import { convertToDate, dateToString, generateUrl, resumeText } from '../../../common/helpers';
import { BASE_API } from '../../../store/config';
import { ICategory, IFile } from '../../../common/interface';
import { updateNotes } from '../../../store/slice/notesSlide';
import { data } from '../config';
import { useDeleteNotesMutation, useNotesMutation } from '../../../store/api/notesApi';
import { INote, IPropsGetNote } from '../../../store/api/interface';

export const TaskPage = () => {
	const dispatch = useDispatch();
	const [getData, {}] = useCategoriesMutation<any>();

	const handleGetData = async () => {
		const { data }: any = await getData({ page: 1, cant: 4 });
		dispatch(updateCategories(data));
	};
	useEffect(() => {
		handleGetData();
	}, []);
	return (
		<section className='flex flex-col h-full '>
			<h1 className='text-1/4 bold mb-1 text-primary'>Tareas</h1>
			<p className='paragraph mb-3 text-letter'>Visualiza tus tareas en esta sección</p>
			<div className='content-tab flex py-3 border-y border-slate-200 d-flex mb-4 border-solid gap-2 flex-wrap xsm:flex-no-wrap'>
				<SearchInput />
				<ButtonAddTask />
				<ButtonAddCategoryTask />
				<ButtonDeleteTask />
			</div>
			<div className='flex w-full bg-seventh rounded-lg h-full p-4 gap-4 overflow-hidden'>
				<TypesTask></TypesTask>
				<ContentCategories />
			</div>
		</section>
	);
};
interface Props {
	data: any[];
	meta: {
		currentPage: number;
		lastPage: number;
		next: number;
		perPage: number;
		prev: null | number;
		total: number;
	};
}
const ContentCategories = () => {
	return (
		<div className='w-full h-full bg-white rounded-lg p-4 flex flex-col'>
			<ContentSubCategories></ContentSubCategories>
			<div className='w-full h-[1px] bg-slate-200 my-4'></div>
			<ContentTasks></ContentTasks>
		</div>
	);
};

const ContentSubCategories = () => {
	const [getSubCategories, {}] = useSubcategoriesMutation();
	const [getNotes, {}] = useNotesMutation();
	const dispatch = useDispatch();

	const subCategory = useSelector((state: any) => state.categorySlice.subCategory);

	const handleSubCategory = async (c: any) => {
		const { data }: any = await getNotes({ uuid: c.uuid });
		dispatch(updateNotes(data.data));
	};
	return (
		<div className='w-full h-8 flex gap-4'>
			{subCategory.map((item: any) => {
				return <SubCategory handleSubCategory={handleSubCategory} item={item} key={item.uuid} />;
			})}
		</div>
	);
};

const SubCategory = ({ handleSubCategory, item }: { handleSubCategory: (c: any) => void; item: any }) => {
	const colorRandom = useMemo(() => {
		const randomColor = Array.from({ length: 3 }, () => Math.floor(Math.random() * 128) + 64);
		const hexColor = randomColor.map(component => component.toString(16).padStart(2, '0')).join('');
		return `#${hexColor}`;
	}, []);
	return (
		<div
			className={`w-max h-full px-4 rounded-full flex items-center justify-center text-white text-sub-category cursor-pointer`}
			style={{ backgroundColor: colorRandom }}
			onClick={() => {
				handleSubCategory(item);
			}}
		>
			{item.name}
		</div>
	);
};

export const ContentTasks = () => {
	const notes = useSelector((state: any) => state.notesSlice.notes);
	return (
		<div className='w-full h-full grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-4'>
			{notes.map((note: any) => {
				return <Task key={note.uuid} note={note}></Task>;
			})}
		</div>
	);
};

export const Task = ({ note }: { note: INote }) => {
	const dispatch = useDispatch();
	const [deleteNote, {}] = useDeleteNotesMutation();
	const [getNotes, {}] = useNotesMutation();
	const handleDelete = async () => {
		const resDelete: any = await deleteNote({ uuid: note.uuid });
		if (resDelete.data.status == 200) {
			const resNotes: any = await getNotes({ page: 1, cant: 10 });
			dispatch(updateNotes(resNotes.data.data));
		}
	};
	const handleEdit = () => {};
	return (
		<div className='h-[15rem] w-full rounded-xl bg-white border-solid border border-gray-100 p-4 flex flex-col'>
			<div className='flex'>
				<span className='text-1/2 text-primary w-max'>{resumeText(note.title, 20)}</span>
				<div className='ml-auto flex gap-2'>
					<div
						className='w-7 h-7 cursor-pointer rounded-md border border-solid border-danger flex items-center justify-center'
						onClick={() => {
							handleDelete();
						}}
					>
						<div className='w-[60%] h-[60%] mask-center icon-delete bg-danger'></div>
					</div>
					<div
						className='w-7 h-7 cursor-pointer rounded-md border border-solid border-success flex items-center justify-center'
						onClick={() => {
							handleEdit();
						}}
					>
						<div className='w-[60%] h-[60%] mask-center icon-edit bg-success'></div>
					</div>
				</div>
			</div>
			<div className='w-full h-[1px] bg-gray-100 my-2'></div>
			<div className='content h-full'>{note.description}</div>
			<div className='text-gray-400 text-0/9'>{convertToDate(note.createdAt)}</div>
		</div>
	);
};

const TypesTask = () => {
	const dispatch = useDispatch();
	const [getDataNotes, {}] = useNotesMutation();
	const categories = useSelector((state: any) => state.categorySlice.categories);
	const showAllNotes = async () => {
		const resNotes: any = await getDataNotes({ page: 1, cant: 10 });
		dispatch(updateNotes(resNotes.data.data));
	};
	return (
		<div className='min-w-[25rem] w-[25rem] h-max bg-white rounded-xl p-4 max-h-[100%] overflow-hidden flex flex-col'>
			<div className='flex mb-4'>
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
			<div className='flex flex-col gap-2 scroll overflow-y-auto'>
				{categories?.data?.map((item: any) => {
					return <ItemTypeTask key={item.uuid} category={item}></ItemTypeTask>;
				})}
			</div>
		</div>
	);
};

interface IProps extends ICategory {
	image: IFile;
}

const ItemTypeTask = ({ category }: { category: IProps }) => {
	const [getSubCategories, {}] = useSubcategoriesMutation();
	const [getNotes, {}] = useNotesMutation();
	const categoriesSelected = useSelector((state: any) => state.categorySlice.categoriesSelected);
	const dispatch = useDispatch();
	const handleSelect = async (c: any) => {
		const { data }: any = await getSubCategories({ parent: c.uuid });
		const resNotes: any = await getNotes({ uuid: c.uuid });
		dispatch(updateSubCategories(data.data));
		dispatch(updateNotes(resNotes.data.data));
		dispatch(selectCategory(category));
	};
	return (
		<div
			className={`w-full h-[8rem] rounded-xl bg-[#f1f4ff] cursor-pointer hover:bg-[#dce4ff] duration-300 group p-3 flex gap-4 [&.active]:bg-[#dce4ff] relative ${
				categoriesSelected.uuid == category.uuid ? 'active' : ''
			}`}
			onClick={() => {
				handleSelect(category);
			}}
		>
			<div className='w-7 h-7 cursor-pointer rounded-full bg-[#3360b1] absolute top-2 right-2 flex items-center justify-center'>
				<div className='bg-white mask-center icon-edit w-1/2 h-1/2'></div>
			</div>
			<LazyImage src={generateUrl(category.image, BASE_API)} class='w-[6rem] h-full rounded-xl overflow-hidden'></LazyImage>
			<div className='flex flex-col'>
				<span className='text-1/2 text-sixth'>{category.name}</span>
				<p className='text-sixth text-0/9'>lore</p>
				<div className='flex mt-auto'>
					<div className='text-gray-500 group-hover:text-primary group-hover:bg-white text-0/8 rounded-full bg-gray-100 px-4 h-7 flex items-center duration-300'>hace 4min</div>
				</div>
			</div>
		</div>
	);
};
