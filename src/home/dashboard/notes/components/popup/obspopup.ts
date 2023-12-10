import { BehaviorSubject } from 'rxjs';
export const initDataNote = {
	status: true,
	uuid: '',
	title: '',
	description: '',
	content: '',
	categories: [],
	color: '',
};
export const obsNote = new BehaviorSubject(initDataNote);