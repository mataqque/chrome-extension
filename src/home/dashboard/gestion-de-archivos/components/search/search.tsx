import { useState } from 'react';
import './search.scss';
import { useDispatch } from 'react-redux';
import { delayfunc } from '../../../../../common/helpers';
import { updateFiles } from '../../../../../store/slice/file_managerSlice';
import { useGetFilesMutation } from '../../../../../store/api/filesApi';
export const InputSearchFile = () => {
	const dispatch = useDispatch();
	const [getFiles, { isSuccess }] = useGetFilesMutation();
	// const []
	const handleSearch = async (event: any) => {
		event.preventDefault();
		const searchQuery = event.target.q.value;
		const searchParams = new URLSearchParams();
		searchParams.set('q', searchQuery);
		const url = new URL(window.location.href);
		url.search = searchParams.toString();
		window.history.pushState({}, '', url);
		await delayfunc(async () => {
			const { data }: any = await getFiles(url.search);
			dispatch(updateFiles(data.results));
		}, 1000);
	};
	return (
		<form className='form_search' onSubmit={handleSearch}>
			<div className='h-10 relative text-gray-600 focus-within:text-gray-400'>
				<span className='absolute inset-y-0 left-0 flex items-center pl-2'>
					<button type='submit' className='p-1 focus:outline-none focus:shadow-outline'>
						<i className='w-6 h-6 bg-white icon-search absolute flex mask-center top-0 bottom-0 my-auto left-1'></i>
					</button>
				</span>
				<input type='search' name='q' className='py-2 text-base text-white rounded-md pl-10 focus:outline-none focus:text-white input_search' placeholder='Search...' autoComplete='off' />
			</div>
		</form>
	);
};
