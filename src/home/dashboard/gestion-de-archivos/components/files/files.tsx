import './files.scss';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import Skeleton from 'react-loading-skeleton';
import Image from 'next/image';
import { IFile } from '@/common/interface.global';
import { gnPathFile } from '@/common/helpers';
import { selectFile } from '../../files.slice';

interface IProps {
	file: IFile & { selected?: boolean };
	fn: any;
}

export function File({ file, fn }: IProps) {
	const dispatch = useDispatch();
	return (
		<div
			className={`content-file ${file.selected ? 'active' : ''}`}
			onClick={() => {
				dispatch(fn(file));
			}}
		>
			<div className='content_img'>
				<div className='elvolve_img'>
					<Image src={gnPathFile(file)} alt='' width={500} height={270} />
				</div>
			</div>
			<span className='title-file'>{file.fileName}</span>
		</div>
	);
}
