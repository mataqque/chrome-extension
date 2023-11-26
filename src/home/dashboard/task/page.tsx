import { useEffect, useState } from 'react';
import { useCategoriesMutation } from '../../../store/api/categoryApi';
import { LazyImage } from '../gestion-de-archivos/components/lazyImages/images';
import { ButtonAddTask } from './components/buttons/buttonButton';
import { ButtonDeleteTask } from './components/buttons/buttonDelete';
import { SearchButtonTask } from './components/inputs/searchButton';
import { useDispatch } from 'react-redux';
import { selectCategory, updateCategories } from '../../../store/slice/categorySlice';
import { useSelector } from 'react-redux';

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
				<SearchButtonTask />
				<ButtonAddTask />
				<ButtonDeleteTask />
			</div>
			<div className='flex w-full bg-seventh rounded-lg h-full p-4 gap-4'>
				<TypesTask></TypesTask>
				<SubCategories />
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
const SubCategories = () => {
	const textoColorBlanco = [255, 255, 255];
	const categories = useSelector((state: any) => state.categorySlice.categories);
	const colorRandom = (textoColor: any[]) => {
		const randomColor = Array.from({ length: 3 }, () => Math.floor(Math.random() * 128) + 64);

		// Convierte los componentes RGB a formato hexadecimal
		const hexColor = randomColor.map(component => component.toString(16).padStart(2, '0')).join('');

		return `#${hexColor}`;
	};
	return (
		<div className='w-full h-full bg-white rounded-lg p-4 flex flex-col'>
			<div className='w-full h-8 flex gap-4'>
				{categories?.data?.map((item: any) => {
					return (
						<div
							className={`w-max h-full px-4 rounded-full flex items-center justify-center text-white text-sub-category`}
							key={item.uuid}
							style={{ backgroundColor: colorRandom(textoColorBlanco) }}
						>
							{item.name}
						</div>
					);
				})}
			</div>
			<div className='w-full h-[1px] bg-slate-200 my-4'></div>
		</div>
	);
};
const TypesTask = () => {
	const categories = useSelector((state: any) => state.categorySlice.categories);

	return (
		<div className='min-w-[25rem] w-[25rem] h-max bg-white rounded-xl p-4 shadow-[0px_0px_10px_-2px_#b8cad9]'>
			<div className='flex mb-2'>
				<div className='mask-left icon-notepad w-8 h-8 bg-sixth mr-2'></div>
				<span className='text-sixth text-1/4'>Categorías de Tareas</span>
			</div>
			<span className='text-[#3360b1] text-1/1 mb-2 flex'>130 Tareas</span>
			<div className='flex flex-col gap-2'>
				{categories?.data?.map((item: any) => {
					return <ItemTypeTask key={item.uuid} category={item}></ItemTypeTask>;
				})}
			</div>
		</div>
	);
};

const ItemTypeTask = ({ category }: any) => {
	const categoriesSelected = useSelector((state: any) => state.categorySlice.categoriesSelected);
	const dispatch = useDispatch();
	const handleSelect = () => {
		dispatch(selectCategory(category));
	};
	return (
		<div
			className={`w-full h-[8rem] rounded-xl bg-[#f1f4ff] cursor-pointer hover:bg-[#dce4ff] duration-300 group p-3 flex gap-4 [&.active]:bg-[#dce4ff] ${
				categoriesSelected.includes(category) ? 'active' : ''
			}`}
			onClick={() => {
				handleSelect();
			}}
		>
			<LazyImage src='https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' class='w-[6rem] h-full rounded-xl overflow-hidden'></LazyImage>
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