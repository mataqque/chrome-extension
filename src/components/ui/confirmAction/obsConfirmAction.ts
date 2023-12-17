import { BehaviorSubject } from 'rxjs';

export const obsConfirmAction = new BehaviorSubject<{ message: string; fn: Function }>({
	message: '',
	fn: () => {},
});
