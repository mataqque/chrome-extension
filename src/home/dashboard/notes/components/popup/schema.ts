import * as Yup from 'yup';

export const taskSchema = () =>
	Yup.object().shape({
		status: Yup.boolean().required(),
		name: Yup.string().required(),
		description: Yup.string().required(),
		imageFileId: Yup.string(),
		parentCategoryId: Yup.string(),
	});
export const noteSchema = () =>
	Yup.object().shape({
		status: Yup.boolean().required(),
		name: Yup.string().required(),
		description: Yup.string().required(),
		content: Yup.string().required(),
		categoryId: Yup.string(),
	});
