import { useContext } from 'react';
import { ModalContext } from '../../../../../components/ui/modal/modal';
import { obsModal } from '../../../../../components/ui/modal/obsModal';
import { useSelector } from 'react-redux';
import { IFileSelected } from '../../../../../common/interface';
import { useDeleteFilesMutation, useGetFilesMutation } from '../../../../../store/api/filesApi';
import { useDispatch } from 'react-redux';
import { updateFiles } from '../../../../../store/slice/file_managerSlice';

export const ButtonDeleteFile = () => {
	const dispatch = useDispatch();
	const filesSelected = useSelector((state: any) => state.filesManageSlice.filesSelected);
	const [deleteFiles, {}] = useDeleteFilesMutation<any>();
	const [getData, {}] = useGetFilesMutation<any>();

	const handleGetData = async () => {
		const { data }: any = await getData('');
		console.log(data);
		dispatch(updateFiles(data.data));
	};
	const handle = async () => {
		const { data }: any = await deleteFiles({ data: filesSelected.map((file: IFileSelected) => file.uuid) });
		if (data.status == 200) {
			handleGetData();
		}
	};
	return (
		<div
			className='cursor-pointer h-10 w-max bg-danger p-4 text-white flex items-center justify-center rounded-md'
			onClick={() => {
				handle();
			}}
		>
			Eliminar
		</div>
	);
};
