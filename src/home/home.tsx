import { useEffect, useState } from 'react';
import { FormContainer } from '../common/form';
import { ParametersForm, homeSchema } from './schema';
import { InputText, InputTextPassword } from '../components/ui/Inputs/InputText';
import person from '../assets/multimedia/icons/user.svg?url';
import LayoutDashboard from './dashboard/dashboard';
import { GestionDeArchivos } from './dashboard/gestion-de-archivos/page';
import { useSelector } from 'react-redux';
import { data } from './dashboard/config';

export const Home = () => {
	const id = useSelector((state: any) => state.dashboardSlice.activeId);
	const Component = data.get(id)?.component;

	return (
		<main className='w-full h-screen'>
			<LayoutDashboard>{Component}</LayoutDashboard>
		</main>
	);
};
