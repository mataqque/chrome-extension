import { ICategory } from '../../../../../common/interface';
import { INote } from '../../../../../store/api/interface';
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
		.catch(err => console.error(err));
	return res;
};

export const getDataParentAndChild = async (): Promise<ICategory[]> => {
	const res = await fetch(BASE_API_LOCAL + '/categories/parentsandchilds')
		.then(res => res.json())
		.catch(err => console.error(err));
	return res;
};
