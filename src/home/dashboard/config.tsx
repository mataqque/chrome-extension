import { generateId } from '../../common/helpers';
import { GestionDeArchivos } from './gestion-de-archivos/page';
import { NotePage } from './notes/page';
import { TaskPage } from './task/page';

export interface ISidebarItem {
	id?: string;
	title: string;
	icon: string;
	segment: string | null;
	to: string;
	notification?: number;
	sublist?: any[];
	component?: React.ReactNode;
}
export interface IList_sidebars {
	title: string;
	list_items: ISidebarItem[];
}
export interface ISidebar {
	title: string;
	list_sidebars: IList_sidebars[];
}

export const itemSidebar = [
	{
		title: 'Media',
		list_items: [
			{
				title: 'Gestion de archivos',
				icon: 'icon-media',
				segment: 'gestion-de-archivos',
				to: '/dashboard/gestion-de-archivos',
				component: <GestionDeArchivos />,
				id: generateId({ type: 'string' }),
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
				component: <NotePage />,
				id: generateId({ type: 'string' }),
			},
			{
				title: 'Actividad',
				icon: 'icon-list',
				segment: 'actividad',
				to: '/dashboard/actividad',
				notification: 2,
				id: generateId({ type: 'string' }),
			},
			{
				title: 'Tareas',
				icon: 'icon-form',
				segment: 'gestion-de-tareas',
				to: '/dashboard/gestion-de-tareas',
				component: <TaskPage />,
				id: generateId({ type: 'string' }),
			},
			{
				title: 'Notas',
				icon: 'icon-form',
				segment: 'gestion-de-tareas',
				to: '/dashboard/gestion-de-tareas',
				component: <NotePage />,
				id: generateId({ type: 'string' }),
			},
			{
				title: 'Usuarios',
				icon: 'icon-users',
				segment: 'usuarios',
				to: '/dashboard/usuarios',
				id: generateId({ type: 'string' }),
			},
			{
				title: 'Productos',
				icon: 'icon-product',
				segment: 'gestion-de-productos',
				to: '/dashboard/gestion-de-productos',
				id: generateId({ type: 'string' }),
			},
			{
				title: 'Categorias',
				icon: 'icon-tags',
				segment: 'gestion-de-categorias',
				to: '/dashboard/gestion-de-categorias',
				id: generateId({ type: 'string' }),
			},

			{
				title: 'Plugins',
				icon: 'icon-plugins',
				segment: 'plugins',
				to: '/dashboard/plugins',
				id: generateId({ type: 'string' }),
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
				id: generateId({ type: 'string' }),
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
				id: generateId({ type: 'string' }),
			},
		],
	},
];

export const data = new Map<string, any>();
itemSidebar.forEach((_l: any, index: number) => {
	_l.list_items.forEach((item: any) => {
		data.set(item.id, item);
	});
});

export const dataDasboard: ISidebar = {
	title: 'Admin Dashboard',
	list_sidebars: itemSidebar,
};
