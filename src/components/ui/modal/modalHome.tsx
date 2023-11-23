'use client';
import * as Yup from 'yup';
import { FormContainer } from '@/common/form/Form';
import { ParametersForm } from '@/interface';
import { InputText, InputTextPassword } from '../Inputs/InputText';
import mail from '@/assets/multimedia/icons/mail.svg';
import { FormikSubmitHandler, modalHomeSchema } from '@/common/constraints/ValidatonSchemas';
import React, { useContext } from 'react';
import { ModalContext } from './modal';

export const ModalHome = () => {
	const modalContext = useContext(ModalContext);
	if (!modalContext) {
		throw new Error('ModalHome debe estar dentro de un componente Modal.');
	}
	const { onClose } = modalContext;
	const initialValues = {
		email: '',
	};
	const schemaType = modalHomeSchema();
	const handleSubmit: FormikSubmitHandler<Yup.InferType<typeof schemaType>> = (values, form) => {
		console.log(values);
		onClose(false);
	};
	return (
		<div className='w-[30rem] p-8 h-max bg-white rounded-lg relative'>
			<div
				className='mask-center icon-close bg-gray-300 h-4 w-4 cursor-pointer absolute top-4 right-4'
				onClick={() => {
					onClose(false);
				}}
			></div>
			<h3 className='text-2xl font-ibm_medium text-secondary text-center mb-6 text-balance'>Subscribe y recibe promociones</h3>
			<FormContainer initialValues={initialValues} validationSchema={modalHomeSchema} onSubmit={handleSubmit}>
				{(form: any) => {
					const { handleSubmit, isSubmitting, errors, touched }: ParametersForm = form;
					// console.log({ errors, touched });
					return (
						<form className='form-styled' onSubmit={handleSubmit} autoComplete='off'>
							<div className='mb-2'>
								<InputText name='email' placeholder='Email' form={form} icon={mail} />
							</div>
							<div className='mb-3'></div>
							<button type='submit' className='btn-submit h-12 w-full border border-solid rounded-lg border-secondary bg-secondary text-white'>
								Ingresar
							</button>
						</form>
					);
				}}
			</FormContainer>
		</div>
	);
};
