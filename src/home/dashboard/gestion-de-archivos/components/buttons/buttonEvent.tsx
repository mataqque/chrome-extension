import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { FileManagerContext } from '../../page';
import { ModalContext } from '../../../../../components/ui/modal/modal';

export const ButtonEvent = () => {
	const { onClose } = useContext(ModalContext);
	const { fn } = useContext(FileManagerContext);
	const select = useSelector((state: any) => state.filesManageSlice.filesSelected);
	const event = () => {
		fn(select);
		onClose(false);
	};
	return (
		<div
			className={`cursor-pointer h-10 w-max bg-gray-100 p-4 text-white flex items-center justify-center rounded-md [&.active]:bg-primary ${select.length > 0 ? 'active' : ''}`}
			onClick={() => {
				event();
			}}
		>
			Seleccionar archivo
		</div>
	);
};
