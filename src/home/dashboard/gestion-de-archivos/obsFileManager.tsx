import { BehaviorSubject } from 'rxjs';

interface IProps {
	[key: string]: { fn: Function };
}
export const obsFileManager = new BehaviorSubject<IProps>({});
