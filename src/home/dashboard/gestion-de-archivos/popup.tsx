import { useContext } from 'react';
import { FileManager } from './page';
import { ModalContext } from '../../../components/ui/modal/modal';

export const ModalUpload = () => {
	const { onClose } = useContext(ModalContext);
	return (
		<div className='h-[30rem] w-[48rem] p-4 relative rounded-xl bg-white'>
			<div
				className='mask-center icon-close cursor-pointer absolute w-4 h-4 bg-gray-400 top-3 right-3 z-[1]'
				onClick={() => {
					onClose(false);
				}}
			/>
			<FileManager type='modal'></FileManager>
		</div>
	);
};
