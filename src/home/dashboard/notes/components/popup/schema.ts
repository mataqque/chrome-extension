import * as Yup from 'yup';

export const taskSchema = () =>
	Yup.object().shape({
		status: Yup.boolean().required(),
		name: Yup.string().required(),
		description: Yup.string().required(),
		imageFileId: Yup.string().nullable(),
		parentCategoryId: Yup.string().nullable(),
	});
