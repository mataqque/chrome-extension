'use client';
import { IFile, IFileSelected, IResFiles } from '@/common/interface.global';
import { File } from './files';
import { use, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Pagination } from '@mui/material';
import { bytesToSize, convertToDate } from '@/common/helpers';
import { Fileinf } from '../fileinf/fileinf';
import { useGetFilesMutation } from '../../files.api';
import { selectFile, updateFilesMoodal } from '../../modalmanagerfile.slice';
interface IProps {
	data: IResFiles;
}
export const ModalContentFiles = ({ data }: IProps) => {
	const [getfiles, {}] = useGetFilesMutation<any>();
	const { results, records } = data;
	const dispatch = useDispatch();
	const files: IFile[] = useSelector((state: any) => state.modalfilesManageSlice.files);

	const handleChange = async (event: any, value: number) => {
		const { data }: any = await getfiles('?index=' + value);
		dispatch(updateFilesMoodal(data.results));
	};
	useEffect(() => {
		dispatch(updateFilesMoodal(results));
	}, [results]);
	return (
		<div className='envol_main'>
			<div className='envolves_content_files'>
				<div className='content-files'>
					{files.map((file: IFile, index: number) => {
						return <File file={file} key={'file-' + index} fn={selectFile} />;
					})}
				</div>
				<div className='content_pagination'>
					<Pagination count={Math.ceil(records.cant / records.limit)} variant='outlined' shape='rounded' onChange={handleChange} tabIndex={1} />
				</div>
			</div>
		</div>
	);
};
