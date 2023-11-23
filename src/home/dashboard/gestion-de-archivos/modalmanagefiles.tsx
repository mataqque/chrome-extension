'use client';
import './modal.scss';
import { useSelector, useDispatch } from 'react-redux';
import { InputSearchFile } from './components/search/search';
import { BtnAddFile, BtnDeleteFile, BtnSelectFile } from './components/buttons/button';
import { ContentFiles } from './components/files/contentfiles';
import { IFile } from '@/common/interface.global';
import { IResFiles } from '../../../common/interface.global';
import { closeModal, showModal } from './modalmanagerfile.slice';
import { useEffect, useState } from 'react';
import { API_LOCAL } from '@/store/config';
import { ModalContentFiles } from './components/files/modalcontentfile';

export default function ModalManageFile() {
	const dispatch = useDispatch();
	const activemodal = useSelector((state: any) => state.modalfilesManageSlice.modalactive);
	if (activemodal) {
		return (
			<div className='modal_manage_files'>
				<div className='content_manage_files'>
					<div
						className='icon mask icon-close'
						onClick={() => {
							dispatch(closeModal());
						}}
					></div>
					<div className='_manage_files'>
						<h1 className='title bold mb-1 text-letter'>Administrador de archivos</h1>
						<p className='paragraph mb-3 color1'>
							Sube tus archivos mp3, mp4, jpg ,png, webp, svg. etc, los archivos deben pesar menos de 10mb, no se admiten archivos con peso mayor a 100mb
						</p>
						<div className='content-tab flex py-3 border-y border-slate-200 d-flex mb-4 border-solid gap-2'>
							<InputSearchFile />
							<BtnAddFile />
							<BtnSelectFile />
							<BtnDeleteFile />
						</div>
						<InitContentFiles />
					</div>
				</div>
			</div>
		);
	}
	return <></>;
}

const fetching = async () => {
	const res = await fetch(API_LOCAL + '/files/getFiles')
		.then(res => res.json())
		.catch(err => {
			console.log(err);
		});
	return res || {};
};
function InitContentFiles() {
	const [data, setData] = useState<IResFiles>({
		records: {
			cant: 10,
			limit: 100,
		},
		results: [],
	});
	useEffect(() => {
		fetching().then(res => {
			setData(res);
		});
	}, []);
	return <ModalContentFiles data={data} />;
}
