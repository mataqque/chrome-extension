import { BASE_API_LOCAL } from '../../../store/config';

export const fetching = async () => {
	const res = await fetch(BASE_API_LOCAL + '/files/getFiles', { cache: 'no-store' })
		.then(res => res.json())
		.catch(err => {
			console.error(err);
		});
	return (
		res || {
			records: {
				cant: 10,
				limit: 100,
			},
			results: [],
		}
	);
};
