import { useEffect } from 'react';
import { FormContainer } from '../common/form';
import { ParametersForm, homeSchema } from './schema';
import { InputText, InputTextPassword } from '../components/ui/Inputs/InputText';
import person from '../assets/multimedia/icons/user.svg?url';
import LayoutDashboard from './dashboard/dashboard';
import { GestionDeArchivos } from './dashboard/gestion-de-archivos/page';

export const Home = () => {
	const initialValues = {
		email: '',
		password: '',
	};
	return (
		<main className='w-full h-screen'>
			<LayoutDashboard>
				<GestionDeArchivos></GestionDeArchivos>
			</LayoutDashboard>
		</main>
	);
};
