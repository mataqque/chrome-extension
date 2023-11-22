import { useEffect } from 'react';
import { FormContainer } from '../common/form';
import { ParametersForm, homeSchema } from './schema';
import { InputText, InputTextPassword } from '../components/ui/Inputs/InputText';
import person from '../assets/multimedia/icons/user.svg?url';

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

	return (
		<main className='w-full h-screen'>
			<FormContainer initialValues={initialValues} validationSchema={homeSchema} onSubmit={handleSubmit}>
				{(form: any) => {
					const { handleSubmit, isSubmitting, errors, touched }: ParametersForm = form;
					// console.log({ errors, touched });
					return (
						<form className='form-styled' onSubmit={handleSubmit} autoComplete='off'>
							<div className='mb-2'>
								<InputText name='email' placeholder='Email' form={form} icon={person} />
							</div>
							<div className='mb-3'>
								<InputTextPassword name='password' placeholder='Contraseña' form={form} />
							</div>

							<button type='submit' className='btn-submit h-12 w-full border border-solid rounded-lg border-secondary bg-secondary text-white'>
								Ingresar
							</button>
						</form>
					);
				}}
			</FormContainer>
		</main>
	);
};
