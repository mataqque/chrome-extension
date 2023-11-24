import { BASE_API_LOCAL } from '../../config';

export const fetching = async () => {
	const res = await fetch(BASE_API_LOCAL + '/files/getFiles', { cache: 'no-store' })
		.then(res => res.json())
		.catch(err => {
			console.log(err);
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
