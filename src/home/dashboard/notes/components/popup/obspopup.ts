import { BehaviorSubject } from 'rxjs';
import { IFile } from '../../../../../common/interface';
export const initDataNote = {
	status: true,
	uuid: '',
	title: '',
	description: '',
	content: '',
	categories: [] as any[],
	color: '',
};
export const initDataCategoryNote = {
	uuid: '',
	status: false,
	name: '',
	description: '',
	imageFileId: '',
	parentCategoryId: '',
	image: {} as IFile,
};
export const obsNote = new BehaviorSubject(initDataNote);
export const obsCategoryNote = new BehaviorSubject(initDataCategoryNote);
