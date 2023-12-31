import { useSelector } from 'react-redux';
import { IFileSelected } from '../../../../../common/interface';
import { useDeleteFilesMutation, useGetFilesMutation } from '../../../../../store/api/filesApi';
import { useDispatch } from 'react-redux';
import { deleteFilesSelected, updateFiles } from '../../../../../store/slice/file_managerSlice';
import { confirmAction } from '../../../../../common/helpers';

export const ButtonDeleteFile = () => {
	const dispatch = useDispatch();
	const filesSelected = useSelector(deleteFilesSelected);
	const [deleteFiles, {}] = useDeleteFilesMutation<any>();
	const [getData, {}] = useGetFilesMutation<any>();

	const handleGetData = async () => {
		const { data }: any = await getData('');
		dispatch(updateFiles(data.data));
	};
	const handle = async () => {
		confirmAction('¿Seguro que deseas eliminar los archivos seleccionados?', async () => {
			const { data }: any = await deleteFiles({ data: filesSelected.map((file: IFileSelected) => file.uuid) });
			if (data.status == 200) {
				handleGetData();
			}
		});
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
