import { useDispatch } from 'react-redux';
import { delayfunc } from '../../../../../common/helpers';
import { useSearchNotesMutation } from '../../../../../store/api/notesApi';
import { updateNotes } from '../../../../../store/slice/notesSlide';

export const SearchInput = () => {
	const dispatch = useDispatch();
	const [getSearch, {}] = useSearchNotesMutation<any>();

	const handleSearch = async (e: any) => {
		const value = e.target.value;
		const resSearch: any = await getSearch({ search: value });
		dispatch(updateNotes(resSearch.data.data));
		// delayfunc();
	};
	return (
		<div className='relative'>
			<div className='absolute top-0 left-0 h-full w-10 flex items-center justify-center'>
				<div className='w-5 h-5 mask-center icon-search bg-white'></div>
			</div>
			<input
				className='bg-primary w-full border border-solid border-fifth h-10 pl-8 pr-4 rounded-lg text-white placeholder:text-gray-100'
				onChange={e => {
					handleSearch(e);
				}}
				type='text'
				placeholder='Buscar'
			/>
		</div>
	);
};
