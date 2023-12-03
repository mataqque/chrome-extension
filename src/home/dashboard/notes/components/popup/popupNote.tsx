import { FormContainer } from '../../../../../common/form';
import { InputText } from '../../../../../components/ui/Inputs/InputText';
import { InputSelect } from '../../../../../components/ui/Inputs/inputSelect';
import { FormikSubmitHandler, ParametersForm } from '../../../../schema';
import { taskSchema } from './schema';
import { ModalContext } from '../../../../../components/ui/modal/modal';
import { useContext, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { ISelectDataProps } from '../../../../../components/ui/Inputs/interface';
import { BASE_API_LOCAL } from '../../../../../store/config';
import { delayfunc, generateId, partials } from '../../../../../common/helpers';
import { getData } from './fetch';
import { useAddCategoryMutation, useCategoriesMutation } from '../../../../../store/api/categoryApi';
import { InputToggle } from '../../../../../components/ui/Inputs/inputToggle';
import { InputAddImage } from '../../../../../components/ui/Inputs/inputAddImage';
import { updateCategories } from '../../../../../store/slice/categorySlice';
import { useDispatch } from 'react-redux';
import { FormikHandlers, FormikState } from 'formik';
import { InputTextArea } from '../../../../../components/ui/Inputs/inputTextArea';

export const PopupNoteAdd = () => {
	const [data, setData] = useState<ISelectDataProps[]>([]);
	const dispatch = useDispatch();
	const [createCategory, {}] = useAddCategoryMutation();
	const [getDataCategories, {}] = useCategoriesMutation();
	const { onClose } = useContext(ModalContext);
	const initialValues = {
		status: true,
		name: '',
		description: '',
		imageFileId: '',
		parentCategoryId: '',
	};
	const schemaType = taskSchema();

	const onSubmit: FormikSubmitHandler<Yup.InferType<typeof schemaType>> = async (values: any, form) => {
		console.log(values);
		// form.resetForm();
	};
	useEffect(() => {
		getData().then(res => {
			const data = partials(res.data, 'Nombre de la categoría');
			setData(data);
		});
	}, []);
	return (
		<div className='w-[30rem] max-h-[80vh] bg-white rounded-xl relative'>
			<div
				className='mask-center icon-close cursor-pointer absolute w-4 h-4 bg-gray-400 top-3 right-3 z-[1]'
				onClick={() => {
					onClose(false);
				}}
			/>
			<FormContainer initialValues={initialValues} onSubmit={onSubmit} validationSchema={taskSchema}>
				{(form: ParametersForm) => {
					const { handleSubmit } = form;
					return (
						<form className='flex flex-col h-input rounded-5 w-full h-full p-6' onSubmit={handleSubmit}>
							<h2 className='text-1/5 text-sixth mb-2'>Crear nueva Nota</h2>
							<div className='flex flex-col gap-5 mb-4'>
								<div className='flex flex-col w-full'>
									<span className='mb-2 flex text-sixth text-1/1'>Estado</span>
									<InputToggle name='status' form={form} />
								</div>
								<div className='flex flex-col w-full'>
									<span className='mb-2 flex text-sixth text-1/1'>Titulo</span>
									<InputText name='name' form={form} placeholder='Nombre de la categoría' />
								</div>
								<div className='flex flex-col w-full'>
									<span className='flex text-sixth text-1/1 mb-2'>Descripción</span>
									<InputText name='description' form={form} placeholder='Descripción' />
								</div>
								<div className='flex flex-col w-full'>
									<span className='flex text-sixth text-1/1 mb-2'>Contenido</span>
									<InputTextArea name='content' form={form} placeholder='Descripción' />
								</div>
								<div className='flex flex-col w-full'>
									<span className='flex text-sixth text-1/1'>Categoría relacionada</span>
									<span className='text-gray-500 text-1/0 mb-2'>Si la categoría es superior no seleccione una opción</span>
									<InputSelect name='parentCategoryId' form={form} data={data} color='#3360b1' />
								</div>
							</div>
							<button type='submit' className='cursor-pointer h-12 w-max bg-success p-4 text-white flex items-center justify-center rounded-md select-none ml-auto text-1/0'>
								Guardar los cambios
							</button>
						</form>
					);
				}}
			</FormContainer>
		</div>
	);
};
