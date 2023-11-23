import * as Yup from 'yup';

export const searchSchema = (values: any) =>
	Yup.object().shape({
		search: Yup.string().min(4).required(),
	});
