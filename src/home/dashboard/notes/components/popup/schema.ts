import * as Yup from 'yup';

export const taskSchema = () =>
	Yup.object().shape({
		status: Yup.boolean(),
		name: Yup.string(),
		description: Yup.string(),
		imageFileId: Yup.string().nullable(),
		parentCategoryId: Yup.string().nullable(),
	});
