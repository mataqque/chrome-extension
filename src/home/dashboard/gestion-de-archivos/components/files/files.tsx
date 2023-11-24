import './files.scss';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import Skeleton from 'react-loading-skeleton';
import { generateUrl } from '../../../../../common/helpers';
import { IFile } from '../../../../../common/interface';
import { useGetFilesMutation } from '../../../../../store/api/filesApi';

interface IProps {
	file: IFile & { selected?: boolean };
	fn: any;
}

export function File({ file, fn }: IProps) {
	const [getFiles, { isSuccess }] = useGetFilesMutation<any>();
	// const dispatch = useDispatch();
	return (
		<div
			className={`content-file ${file.selected ? 'active' : ''}`}
			onClick={() => {
				// dispatch(fn(file));
			}}
		>
			<div className='content_img'>
				<div className='elvolve_img'>
					<img src={generateUrl(file)} alt='' width={500} height={270} />
				</div>
			</div>
			<span className='title-file'>{file.fileName}</span>
		</div>
	);
}
