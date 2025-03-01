import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { ModalContext } from '../../../../../components/ui/modal/modal';
import { obsFileManager } from '../../obsFileManager';
import { IFileSelected } from '../../../../../common/interface';
import { filesSelected } from '../../../../../store/slice/file_managerSlice';

export const ButtonEvent = () => {
	const { onClose } = useContext(ModalContext);
	const select: IFileSelected[] = useSelector(filesSelected);
	console.log('selected files:', select);
	const event = () => {
		const data = obsFileManager.getValue();
		Object.keys(data).forEach(key => {
			if (data[key].fn) {
				data[key].fn(select);
			}
		});
		onClose(false);
	};
	return (
		<div
			className={`cursor-pointer h-10 w-max bg-gray-100 p-4 text-white flex items-center justify-center rounded-md [&.active]:bg-primary ${select ? 'active' : ''}`}
			onClick={() => {
				event();
			}}
		>
			Seleccionar archivo
		</div>
	);
};
