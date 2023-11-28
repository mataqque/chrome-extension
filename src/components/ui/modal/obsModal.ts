import { BehaviorSubject } from 'rxjs';

export interface ModalState {
	[key: string]: { value: boolean; fn?: Function };
}

export const obsModal = new BehaviorSubject<ModalState>({});
