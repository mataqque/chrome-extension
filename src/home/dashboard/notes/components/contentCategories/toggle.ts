import { BehaviorSubject } from 'rxjs';

export interface ModalState {
	toggle: boolean;
}

export const obsToggleCategorySidebar = new BehaviorSubject<ModalState>({
	toggle: false,
});
