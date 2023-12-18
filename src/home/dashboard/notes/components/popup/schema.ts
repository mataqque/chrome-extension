import * as Yup from 'yup';

export const categoryNoteSchema = () =>
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
		uuid: Yup.string().required(),
		title: Yup.string().required(),
		description: Yup.string().required(),
		content: Yup.string(),
		categories: Yup.array(),
		color: Yup.string(),
	});
