import { ISidebar, ISidebarItem, itemSidebar } from './config';
import { InputSearchDash } from '../../components/ui/inputsearchdash/inputsearchdash';
import { SidebarSubItems } from '../../components/ui/subitems/subitems';
import { IconAvatar } from '../../components/ui/avatar/avatar';
import { useSelector, useDispatch } from 'react-redux';
import { changeId } from '../../store/slice/dashboardSlice';
import { useEffect, useState } from 'react';
import { Modal } from '../../components/ui/modal/modal';
import Upload from '../../components/modalupload/modalupload';
import { obsSidebar } from './obsSidebar';
import { PopupCategoryNote } from './notes/components/popup/popupCategoryNote';
import { ModalUpload } from './gestion-de-archivos/popup';
import { PopupNoteAdd } from './notes/components/popup/popupNote';
import { ConfirmAction } from '../../components/ui/confirmAction/confirmAction';
export default function LayoutDashboard({ children }: { children: React.ReactNode }) {
	const closeAside = () => {
		obsSidebar.next(true);
	};
	return (
		<main className='dashboard flex'>
			<Modal index={14} id='confirm'>
				<ConfirmAction></ConfirmAction>
			</Modal>
			<Modal index={12} id='modalupload'>
				<Upload></Upload>
			</Modal>
			<Modal index={11} id='modalGallery'>
				<ModalUpload></ModalUpload>
			</Modal>
			<Modal index={10} id='popupCategoryNote'>
				<PopupCategoryNote></PopupCategoryNote>
			</Modal>
			<Modal index={10} id='popupNote'>
				<PopupNoteAdd></PopupNoteAdd>
			</Modal>
			{/* <Modal index={10} id='popupNote'>
				<PopupTask></PopupTask>
			</Modal> */}
			<AsideBar></AsideBar>
			<div className='content-pages-dash w-full h-screen flex flex-col'>
				<div className='navbar-dashboard h-12 shadow'>
					<div className='w-12 h-full flex items-center justify-center cursor-pointer' onClick={() => closeAside()}>
						<div className='icon mask icon-menu bg-primary h-6 w-6'></div>
					</div>
				</div>
				<div className='p-4 h-full overflow-hidden'>{children}</div>
			</div>
		</main>
	);
}

const AsideBar = () => {
	const dispatch = useDispatch();
	const [open, setOpen] = useState(true);
	const id = useSelector((state: any) => state.dashboardSlice.activeId);
	const change = (id: string) => {
		if (window.innerWidth < 600) {
			obsSidebar.next(false);
			setOpen(false);
		}
		dispatch(changeId(id));
	};
	const eventClose = (value: boolean) => {
		setOpen(value);
	};
	useEffect(() => {
		const aside = obsSidebar.subscribe((data: boolean) => {
			setOpen(data);
		});
		return () => {
			aside.unsubscribe();
		};
	}, [id]);
	return (
		<aside
			className={`sideractive bg-primary max-w-[0rem] w-full overflow-hidden items-end duration-300 ${
				open == true ? 'active' : ''
			} [&.active]:max-w-[20rem] mobile:[&.active]:max-w-[100vw]  mobile:w-full fixed md:relative z-[3] flex flex-col h-screen`}
		>
			<div className='flex flex-col min-w-[20rem] max-w-[20rem] mobile:w-full mobile:max-w-full  bg-primary h-full'>
				<div className='flex flex-col overflow-hidden w-full'>
					<div className='flex items-center pt-4 px-4 gap-2 w-full'>
						<div className='w-4 h-4 rounded-full bg-[#f34a4a]'></div>
						<div className='w-4 h-4 rounded-full bg-[#f6ab1a]'></div>
						<div className='w-4 h-4 rounded-full bg-[#3ac270]'></div>
						<div className='w-12 h-full flex items-center justify-center cursor-pointer ml-auto' onClick={() => eventClose(false)}>
							<div className='icon mask icon-menu  bg-white h-8 w-8'></div>
						</div>
					</div>
					<div className={'flex items-center px-4 py-6'}>
						<div className='text-white font-imb_bold text-1/2 bg-[#2363da] w-10 h-10 flex items-center justify-center text-center rounded-md leading-none mr-4'>D</div>
						<h3 className='text-white IBMPlexSans-Bold text-1/3'>Administrador</h3>
					</div>
					<div className='flex items-center px-4 '>
						<InputSearchDash></InputSearchDash>
					</div>
					<div className='px-4 my-4'>
						<div className='w-full h-[1px] bg-white opacity-10'></div>
					</div>
					<div className='overflow-y-hidden'>
						<div className={'sidebar_menu overflow-y-scroll h-full px-4 scroll'}>
							{itemSidebar.map((item, index: number) => {
								return (
									<div className='flex flex-col' key={'sidebar-' + index}>
										<div className='text-0/9 text-white opacity-70 mb-2'>{item.title}</div>
										<div className='flex flex-col gap-2 text-white mb-4' key={'sidebar-' + index}>
											{item.list_items.map((subitem: ISidebarItem, index: number) => {
												if (subitem?.sublist) {
													return <SidebarSubItems item={subitem} index={index} key={'sidebar-item-' + index}></SidebarSubItems>;
												} else {
													return (
														<div
															className={`w-full min-h-12 h-12 bg-red flex items-center rounded-lg ${
																subitem?.id == id ? 'active' : ''
															} [&.active]:bg-[#293752] hover:bg-[#293752] px-4 cursor-pointer duration-300`}
															key={'sidebar-item-' + index}
															onClick={() => {
																change(subitem?.id || '');
															}}
														>
															<div className='flex '>
																<div className={subitem?.icon + ' mask-left w-5 h-5 mr-4 bg-white'}></div>
																<div className='text-1/0'>{subitem?.title}</div>
															</div>
															{subitem?.notification ? <div className='notification'>{subitem.notification}</div> : <></>}
														</div>
													);
												}
											})}
										</div>
									</div>
								);
							})}
						</div>
					</div>
					<div className='px-4 my-4'>
						<div className='w-full h-[1px] bg-white opacity-10'></div>
					</div>
					<div className='px-4'>
						<div className={`w-full min-h-12 h-12 bg-red flex items-center rounded-lg [&.active]:bg-[#293752] hover:bg-[#293752] px-4 cursor-pointer duration-300`}>
							<div className='flex '>
								<div className={'icon-settings mask-left w-5 h-5 mr-4 bg-white'}></div>
								<div className='text-1/0 text-white'>Configuración</div>
							</div>
						</div>
					</div>
				</div>
				<div className='footer-sidebar flex px-4 py-4'>
					<div className='option_theme'></div>
					<div className='flex user-info w-full '>
						<div className='mr-3'>
							<IconAvatar name='Flavio' photo=''></IconAvatar>
						</div>
						<div className='flex content_part w-full'>
							<div className='flex flex-col '>
								<span className='text-white'>Flavio</span>
								<span className='text-white opacity-70'>Administrador</span>
							</div>
							<div
								className='icon icon-logout ml-auto mask-right w-8 h-10 bg-white cursor-pointer'
								onClick={() => {
									eventClose(false);
								}}
							></div>
						</div>
					</div>
				</div>
			</div>
		</aside>
	);
};
