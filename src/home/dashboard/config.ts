import { generateId } from '../../common/helpers';

export interface ISidebarItem {
	id?: string;
	title: string;
	icon: string;
	segment: string | null;
	to: string;
	notification?: number;
	sublist?: any[];
}
export interface IList_sidebars {
	title: string;
	list_items: ISidebarItem[];
}
export interface ISidebar {
	title: string;
	list_sidebars: IList_sidebars[];
}

const dataDasboard: ISidebar = {
	title: 'Admin Dashboard',
	list_sidebars: [
		{
			title: 'Media',
			list_items: [
				{
					title: 'Gestion de archivos',
					icon: 'icon-media',
					segment: 'gestion-de-archivos',
					to: '/dashboard/gestion-de-archivos',
				},
			],
		},
		{
			title: 'Menú',
			list_items: [
				{
					title: 'Inicio',
					icon: 'icon-home',
					segment: null,
					to: '/dashboard',
				},
				{
					title: 'Actividad',
					icon: 'icon-list',
					segment: 'actividad',
					to: '/dashboard/actividad',
					notification: 2,
				},
				{
					title: 'Tareas',
					icon: 'icon-form',
					segment: 'gestion-de-tareas',
					to: '/dashboard/gestion-de-tareas',
				},
				{
					title: 'Usuarios',
					icon: 'icon-users',
					segment: 'usuarios',
					to: '/dashboard/usuarios',
				},
				{
					title: 'Productos',
					icon: 'icon-product',
					segment: 'gestion-de-productos',
					to: '/dashboard/gestion-de-productos',
				},
				{
					title: 'Categorias',
					icon: 'icon-tags',
					segment: 'gestion-de-categorias',
					to: '/dashboard/gestion-de-categorias',
				},

				{
					title: 'Plugins',
					icon: 'icon-plugins',
					segment: 'plugins',
					to: '/dashboard/plugins',
				},
			],
		},
		{
			title: 'Extensiones',
			list_items: [
				{
					title: 'Bot Whatsapp',
					icon: 'icon-bot',
					segment: 'gestion-de-bot-whatsapp',
					to: '/dashboard/gestion-de-bot-whatsapp',
				},
			],
		},
		{
			title: 'Componentes',
			list_items: [
				{
					title: 'Whatsapp',
					icon: 'icon-whatsapp',
					segment: 'gestion-whatsapp',
					to: '/dashboard/gestion-whatsapp',
				},
			],
		},
	],
};
const build = () => {
	let list_sidebars = dataDasboard.list_sidebars.map((list: IList_sidebars) => {
		list.list_items = list.list_items.map((item: ISidebarItem) => {
			item.id = generateId({ type: 'string' });
			return item;
		});
	});
	return dataDasboard;
};
const Sidebar = build();
export default Sidebar;
