import { BehaviorSubject } from 'rxjs';

interface IProps {
	[key: string]: any;
}
export const obsFileManager = new BehaviorSubject<IProps>({});
