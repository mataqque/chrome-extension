import { File } from './files';

import { IFile, IFileSelected, IResFiles } from '../../../../../common/interface';
import { useEffect, useState } from 'react';

interface IProps {
	data: IResFiles | null;
}
// export const ContentFiles = ({ data }: IProps) => {
// 	const [resData, setData] = useState<IResFiles | null>(data);
// 	console.log(resData);
// 	useEffect(() => {}, [data]);
// 	return (
// 		<div className='envol_main'>
// 			<div className='envolves_content_files'>
// 				<div className='content-files'>
// 					{resData &&
// 						resData.results.map((file: IFile, index: number) => {
// 							return <File file={file} key={'file-' + index} fn={() => {}} />;
// 						})}
// 				</div>
// 				<div className='content_pagination'>{/* <Pagination count={Math.ceil(records.cant / records.limit)} variant='outlined' shape='rounded' onChange={handleChange} tabIndex={1} /> */}</div>
// 			</div>
// 			{/* <Fileinf file={filesSelected[filesSelected.length - 1] || []}></Fileinf> */}
// 		</div>
// 	);
// };
export function ContentFiles({ data }: IProps) {
	const [resData, setData] = useState<IResFiles | null>(data);
	console.log(resData);
	useEffect(() => {}, [data]);
	return (
		<div className='envol_main'>
			<div className='envolves_content_files'>
				<div className='content-files'>
					{resData &&
						resData.results.map((file: IFile, index: number) => {
							return <File file={file} key={'file-' + index} fn={() => {}} />;
						})}
				</div>
				<div className='content_pagination'>{/* <Pagination count={Math.ceil(records.cant / records.limit)} variant='outlined' shape='rounded' onChange={handleChange} tabIndex={1} /> */}</div>
			</div>
			{/* <Fileinf file={filesSelected[filesSelected.length - 1] || []}></Fileinf> */}
		</div>
	);
}
