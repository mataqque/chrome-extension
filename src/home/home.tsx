import { useEffect } from 'react';
import { FormContainer } from '../common/form';
import { ParametersForm, homeSchema } from './schema';
import { InputText, InputTextPassword } from '../components/ui/Inputs/InputText';
import person from '../assets/multimedia/icons/user.svg?url';
import LayoutDashboard from './dashboard/dashboard';
import { GestionDeArchivos } from './dashboard/gestion-de-archivos/page';

export const Home = () => {
	const getData = async () => {
		const response = await fetch('https://pokeapi.co/api/v2/pokemon');
		const data = await response.json();
		console.log(data);
	};
	const handleSubmit = (values: any) => {};
	const initialValues = {
		email: '',
		password: '',
	};
	useEffect(() => {
		getData();
	}, []);
	// const component = {GestionDeArchivos}
	return (
		<main className='w-full h-screen'>
			<LayoutDashboard>
				<GestionDeArchivos></GestionDeArchivos>
			</LayoutDashboard>
		</main>
	);
};
