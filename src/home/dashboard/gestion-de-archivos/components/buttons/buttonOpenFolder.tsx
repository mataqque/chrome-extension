import { useContext } from 'react';
import { ModalContext } from '../../../../../components/ui/modal/modal';
import { obsModal } from '../../../../../components/ui/modal/obsModal';
import { useOpenFolderMutation } from '../../../../../store/api/filesApi';

export const ButtonOpenFolder = () => {
	const [open, {}] = useOpenFolderMutation();
	const openFolder = async () => {
		await open('');
	};
	return (
		<div
			className='cursor-pointer h-10 w-max bg-[#ff7e54] p-4 text-white flex items-center justify-center rounded-md'
			onClick={() => {
				openFolder();
			}}
		>
			Abrir archivo
		</div>
	);
};
