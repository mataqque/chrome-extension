import './style/dashboard.scss';
import style, { sidebar } from './style/dashboard.module.scss';
import Sidebar, { ISidebar, ISidebarItem } from './config';
import { InputSearchDash } from '../../components/ui/inputsearchdash/inputsearchdash';
import { SidebarSubItems } from '../../components/ui/subitems/subitems';
import { IconAvatar } from '../../components/ui/avatar/avatar';
import { useSelector, useDispatch } from 'react-redux';
import { changeId } from '../../store/slice/dashboardSlice';
import { useEffect } from 'react';
import { Modal } from '../../components/ui/modal/modal';
import Upload from '../../components/modalupload/modalupload';
export default function LayoutDashboard({ children }: { children: React.ReactNode }) {
	const dispatch = useDispatch();
	const id = useSelector((state: any) => state.dashboardSlice.activeId);

	const change = (id: string) => {
		dispatch(changeId(id));
	};
	useEffect(() => {}, [id]);
	return (
		<main className={style.dashboard + ' dashboard'}>
			<Modal index={10} id='modalupload'>
				<Upload></Upload>
			</Modal>
			<aside className='sideractive bg-primary min-w-[20rem] mobile:w-full fixed xsm:relative z-[2]'>
				<div className='content-sidebar'>
					<div className={style.points + ' ' + style.containerdash + ' pt-4'}>
						<div className={style.point + ' ' + style.point1}></div>
						<div className={style.point + ' ' + style.point2}></div>
						<div className={style.point + ' ' + style.point3}></div>
					</div>
					<div className={style.containerdash + ' flex items-center py-6'}>
						<div className={style.logo}>D</div>
						<h3 className='text-white IBMPlexSans-Bold'>Administrador</h3>
					</div>
					<div className={style.containerdash + ' flex items-center'}>
						<InputSearchDash></InputSearchDash>
					</div>
					<div className={style.separator}></div>
					<div className='overflow-y-hidden'>
						<div className={'sidebar_menu overflow-y-scroll h-full px-4 scroll'}>
							{Sidebar.list_sidebars.map((item, index: number) => {
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
																subitem.id == id ? 'active' : ''
															} [&.active]:bg-[#293752] hover:bg-[#293752] px-4 cursor-pointer duration-300`}
															key={'sidebar-item-' + index}
															onClick={() => {
																change(subitem.id || '');
															}}
														>
															<div className='flex '>
																<div className={subitem.icon + ' mask-left w-5 h-5 mr-4 bg-white'}></div>
																<div className='text-1/0'>{subitem.title}</div>
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
					<div className={style.separator}></div>
					<div className='px-4'>
						<div className={`w-full min-h-12 h-12 bg-red flex items-center rounded-lg [&.active]:bg-[#293752] hover:bg-[#293752] px-4 cursor-pointer duration-300`}>
							<div className='flex '>
								<div className={'icon-settings mask-left w-5 h-5 mr-4 bg-white'}></div>
								<div className='text-1/0 text-white'>Configuración</div>
							</div>
						</div>
					</div>
				</div>
				<div className={style.containerdash + ' footer-sidebar '}>
					<div className='option_theme'></div>
					<div className='flex user-info'>
						<div className='mr-3'>
							<IconAvatar name='Flavio' photo=''></IconAvatar>
						</div>
						<div className='flex content_part'>
							<div className='flex flex-col'>
								<span className='text-white'>Flavio</span>
								<span className='text-white opacity-70'>Administrador</span>
							</div>
							<div className='icon icon-logout mask'></div>
						</div>
					</div>
				</div>
			</aside>
			<div className='content-pages-dash'>
				<div className='navbar-dashboard'>
					<div className='icon mask icon-menu'></div>
				</div>
				<div className='content-page'>{children}</div>
			</div>
		</main>
	);
}
