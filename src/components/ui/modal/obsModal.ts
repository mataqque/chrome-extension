import { BehaviorSubject } from 'rxjs';

export interface ModalState {
	[key: string]: boolean;
}

export const obsModal = new BehaviorSubject<ModalState>({});
