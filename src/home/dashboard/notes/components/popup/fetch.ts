import { BASE_API_LOCAL } from '../../../../../store/config';
interface IProps {
	data: {
		uuid: string;
		name: string;
		description: string;
		parentCategoryId: null | string;
		metaDescription: string;
		metaKeywords: string;
		imageFileId: null | string;
		createdAt: Date;
		updatedAt: Date;
		status: true;
	}[];
	meta: {
		currentPage: number;
		lastPage: number;
		next: null | number;
		perPage: number;
		prev: null | number;
		total: number;
	};
}
export const getData = async (): Promise<IProps> => {
	const res: IProps = await fetch(BASE_API_LOCAL + '/categories/parents')
		.then(res => res.json())
		.catch(err => console.log(err));
	// const data = partials(res.data);
	return res;
	// setData(res.data);
	// setData(res);
};
