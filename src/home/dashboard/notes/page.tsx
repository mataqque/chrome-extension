import { LazyImage } from '../gestion-de-archivos/components/lazyImages/images';
import { ButtonAddTask } from './components/buttons/buttonButton';
import { ButtonDeleteTask } from './components/buttons/buttonDelete';
import { SearchButtonTask } from './components/inputs/searchButton';

export const NotePage = () => {
	return (
		<section className='flex flex-col h-full '>
			<h1 className='text-1/4 bold mb-1 text-primary'>Notas</h1>
			<p className='paragraph mb-3 text-letter'>Visualiza tus notas en esta sección</p>
			<div className='content-tab flex py-3 border-y border-slate-200 d-flex mb-4 border-solid gap-2 flex-wrap xsm:flex-no-wrap'>
				<SearchButtonTask />
				<ButtonAddTask />
				<ButtonDeleteTask />
			</div>
			<div className='flex w-full bg-seventh rounded-lg h-full p-4'>
				<TypesNote />
			</div>
		</section>
	);
};

const TypesNote = () => {
	return (
		<div className='w-[25rem] h-max bg-white rounded-lg p-4'>
			<div className='flex mb-2'>
				<div className='mask-left icon-notepad w-8 h-8 bg-sixth mr-2'></div>
				<span className='text-sixth text-1/4'>Categorías de Notas</span>
			</div>
			<span className='text-[#3360b1] text-1/1 mb-2 flex'>130 Tareas</span>
			<div className=''>
				<ItemTypeNote />
			</div>
		</div>
	);
};

const ItemTypeNote = () => {
	return (
		<div className='w-full h-[8rem] rounded-xl bg-[#edf0fa] cursor-pointer hover:bg-[#dce4ff] duration-300 group p-3 flex gap-4'>
			<LazyImage src='https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' class='w-[6rem] h-full rounded-xl overflow-hidden'></LazyImage>
			<div className='flex flex-col'>
				<span className='text-1/2 text-sixth'>Titulo de la Nota</span>
				<p className='text-sixth text-0/9'>lore</p>
				<div className='flex mt-auto'>
					<div className='text-gray-500 group-hover:text-primary group-hover:bg-white text-0/8 rounded-full bg-gray-100 px-4 h-7 flex items-center duration-300'>hace 4min</div>
				</div>
			</div>
		</div>
	);
};
