import React, { useEffect, useMemo } from 'react';
import { LazyImage } from '../gestion-de-archivos/components/lazyImages/images';
import { InputSearchNote } from './components/inputs/inputSearchNote';
import { ButtonAddTask } from './components/buttons/buttonAddTask';
import { ButtonAddCategoryTask } from './components/buttons/ButtonAddCategoryTask';
import { useCategoriesMutation, useDeleteCategoryMutation, useSubcategoriesMutation } from '../../../store/api/categoryApi';
import { useDeleteNotesMutation, useNotesMutation } from '../../../store/api/notesApi';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { deleteSubCategory, selectCategory, updateCategories, updateSubCategories } from '../../../store/slice/categorySlice';
import { updateNotes } from '../../../store/slice/notesSlide';
import { ICategory, IFile } from '../../../common/interface';
import { confirmAction, convertToDate, generateUrl, resumeText } from '../../../common/helpers';
import { BASE_API } from '../../../store/config';
import { obsModal } from '../../../components/ui/modal/obsModal';
import { obsNote } from './components/popup/obspopup';
import { INote } from '../../../store/api/interface';
import { ContentCategoryNote } from './components/contentCategories/contentCategories';

export const NotePage = () => {
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
			<h1 className='text-1/4 bold mb-1 text-primary'>Notas</h1>
			<p className='paragraph mb-3 text-letter'>Visualiza tus notas en esta sección</p>
			<div className='content-tab flex py-3 border-y border-slate-200 d-flex mb-4 border-solid gap-2 flex-wrap xsm:flex-no-wrap'>
				<InputSearchNote />
				<ButtonAddTask />
				<ButtonAddCategoryTask />
			</div>
			<div className='flex w-full bg-seventh rounded-lg h-full p-4 gap-4'>
				<ContentCategoryNote />
				<AllNotes />
			</div>
		</section>
	);
};

const AllNotes = () => {
	return (
		<div className='w-full h-full bg-white rounded-lg p-4 flex flex-col'>
			<ContentSubCategories></ContentSubCategories>
			<div className='w-full h-[1px] bg-slate-200 my-4'></div>
			<ContentNotes></ContentNotes>
		</div>
	);
};

export const ContentNotes = () => {
	const notes = useSelector((state: any) => state.notesSlice.notes);
	return (
		<div className='w-full h-full grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-4'>
			{notes.map((note: any) => {
				return <Note key={note.uuid} note={note}></Note>;
			})}
		</div>
	);
};
export const Note = ({ note }: { note: INote }) => {
	const dispatch = useDispatch();
	const [deleteNote, {}] = useDeleteNotesMutation();
	const [getNotes, {}] = useNotesMutation();
	const handleDelete = async () => {
		confirmAction('¿Seguro que deseas eliminar esta nota?', async () => {
			const resDelete: any = await deleteNote({ uuid: note.uuid });
			if (resDelete.data.status == 200) {
				const resNotes: any = await getNotes({ page: 1, cant: 10 });
				dispatch(updateNotes(resNotes.data.data));
			}
		});
	};
	const handleEdit = () => {
		obsModal.next({ ['popupNote']: { value: true } });
		obsNote.next({
			status: true,
			uuid: note.uuid,
			title: note.title,
			description: note.description,
			content: note.content,
			color: note.color,
			categories: note.categories || [],
		});
	};
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

const ContentSubCategories = () => {
	const [getSubCategories, {}] = useSubcategoriesMutation();
	const [getNotes, {}] = useNotesMutation();
	const dispatch = useDispatch();

	const subCategory: ICategory[] = useSelector((state: any) => state.categorySlice.subCategory);

	const handleSubCategory = async (c: any) => {
		const { data }: any = await getNotes({ uuid: c.uuid });
		dispatch(updateNotes(data.data));
	};
	return (
		<div className='w-full h-8 flex gap-4'>
			{subCategory.map((item: ICategory) => {
				return <SubCategory handleSubCategory={handleSubCategory} item={item} key={item.uuid} />;
			})}
		</div>
	);
};
const SubCategory = ({ handleSubCategory, item }: { handleSubCategory: (c: any) => void; item: ICategory }) => {
	const dispatch = useDispatch();
	const [deleteCategory, {}] = useDeleteCategoryMutation();
	const [getCategories, {}] = useCategoriesMutation();
	const handleDelete = async () => {
		confirmAction('¿Estas seguro de eliminar esta categoria?', async () => {
			const { data }: any = await deleteCategory({ uuid: item.uuid });
			if (data.status == 200) {
				dispatch(deleteSubCategory(item));
			}
		});
	};
	const colorRandom = useMemo(() => {
		const randomColor = Array.from({ length: 3 }, () => Math.floor(Math.random() * 128) + 64);
		const hexColor = randomColor.map(component => component.toString(16).padStart(2, '0')).join('');
		return `#${hexColor}`;
	}, []);
	return (
		<div className='relative'>
			<div
				className={`w-max h-full px-4 rounded-full flex items-center justify-center text-white text-sub-category cursor-pointer`}
				style={{ backgroundColor: colorRandom }}
				onClick={() => {
					handleSubCategory(item);
				}}
			>
				{item.name}
			</div>
			<div
				className='w-5 h-5 bg-danger flex items-center justify-center rounded-full absolute top-0 right-0 transform translate-x-[40%] -translate-y-[40%] cursor-pointer'
				onClick={() => {
					handleDelete();
				}}
			>
				<div className='w-[60%] h-[60%] bg-white rounded-full mask-center icon-close'></div>
			</div>
		</div>
	);
};
