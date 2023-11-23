'use client';
import { IFile, IFileSelected, IResFiles } from '@/common/interface.global';
import { File } from './files';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { selectFile, updateFiles } from '../../files.slice';
import { useSelector } from 'react-redux';
import { Pagination } from '@mui/material';
import { bytesToSize, convertToDate } from '@/common/helpers';
import { Fileinf } from '../fileinf/fileinf';
import { useGetFilesMutation } from '../../files.api';

interface IProps {
	data: IResFiles;
}
export const ContentFiles = ({ data }: IProps) => {
	const [getfiles, {}] = useGetFilesMutation<any>();
	const { results, records } = data;
	const dispatch = useDispatch();
	const files: IFile[] = useSelector((state: any) => state.filesManageSlice.files);
	const filesSelected: IFileSelected[] = useSelector((state: any) => state.filesManageSlice.filesSelected);
	const handleChange = async (event: any, value: number) => {
		const { data }: any = await getfiles('?index=' + value);
		dispatch(updateFiles(data.results));
	};
	useEffect(() => {
		dispatch(updateFiles(results));
	}, []);
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
			<Fileinf file={filesSelected[filesSelected.length - 1] || []}></Fileinf>
		</div>
	);
};
