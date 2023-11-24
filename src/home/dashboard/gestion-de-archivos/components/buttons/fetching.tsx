import { BASE_API_LOCAL } from '../../../../config';

export const deleteFiles = (data: string[]): Promise<any> | undefined => {
	if (data && data.length === 0) return;
	const res = fetch(BASE_API_LOCAL + '/files/delete', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ data }),
	});
	return res;
};
