import { FormContainer } from '../../../../../common/form';
import { InputText } from '../../../../../components/ui/Inputs/InputText';
import { InputSelect } from '../../../../../components/ui/Inputs/inputSelect';
import { FormikSubmitHandler, ParametersForm } from '../../../../schema';
import { categoryNoteSchema } from './schema';
import { ModalContext } from '../../../../../components/ui/modal/modal';
import { useContext, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { ISelectDataProps } from '../../../../../components/ui/Inputs/interface';
import { BASE_API_LOCAL } from '../../../../../store/config';
import { delayfunc, generateId, partials } from '../../../../../common/helpers';
import { getData } from './fetch';
import { useAddCategoryMutation, useCategoriesMutation } from '../../../../../store/api/categoryApi';
import { InputToggle } from '../../../../../components/ui/Inputs/inputToggle';
import { InputAddImage, InputAddImage2 } from '../../../../../components/ui/Inputs/inputAddImage';
import { updateCategories } from '../../../../../store/slice/categorySlice';
import { useDispatch } from 'react-redux';
import { FormikHandlers, FormikState } from 'formik';
import { Form } from 'react-router-dom';
import { obsCategoryNote } from './obspopup';
import { IFile } from '../../../../../common/interface';
import { Id } from '../../../../../components/ui/Inputs/inputId';

export const PopupCategoryNote = () => {
	const [data, setData] = useState<ISelectDataProps[]>([]);
	const dispatch = useDispatch();
	const [createCategory, {}] = useAddCategoryMutation();
	const [getDataCategories, {}] = useCategoriesMutation();
	const { onClose } = useContext(ModalContext);
	const [initialValues, setInitialValues] = useState({
		uuid: '',
		status: false,
		name: '',
		description: '',
		imageFileId: '',
		parentCategoryId: '',
		image: {} as IFile,
	});

	const schemaType = categoryNoteSchema();

	const onSubmit: FormikSubmitHandler<Yup.InferType<typeof schemaType>> = async (values: any, form) => {
		const res = await createCategory(values);

		console.log('result', res);

		const resCategories: any = await getDataCategories({ page: 1, cant: 10 });

		dispatch(updateCategories(resCategories.data));

		// form.resetForm();
	};
	useEffect(() => {
		getData().then(res => {
			const data = partials(res.data, 'Nombre de la categoría');
			setData(data);
		});
		const subs = obsCategoryNote.subscribe(data => {
			setInitialValues(data);
		});
		return () => {
			subs.unsubscribe();
		};
	}, []);
	return (
		<div className='w-[30rem] max-h-[80vh] bg-white rounded-xl relative'>
			<div
				className='mask-center icon-close cursor-pointer absolute w-4 h-4 bg-gray-400 top-3 right-3 z-[1]'
				onClick={() => {
					onClose(false);
				}}
			/>
			<FormContainer initialValues={initialValues} onSubmit={onSubmit} validationSchema={categoryNoteSchema}>
				{(form: ParametersForm) => {
					const { handleSubmit, errors } = form;
					return (
						<form className='flex flex-col h-input rounded-5 w-full h-full p-6 xsm:w-[100%_-_1rem]' onSubmit={handleSubmit}>
							<h2 className='text-1/5 text-sixth mb-2'>Crear nueva categoría</h2>
							<div className='flex flex-col gap-5 mb-4'>
								<div className='flex flex-col w-full'>
									<span className='mb-2 flex text-sixth text-1/1'>Estado</span>
									<InputToggle name='status' />
								</div>
								<div className='flex text-1/2 text-gray-500 leading-none'>
									ID : <Id name='uuid' form={form} defaultValue={initialValues.uuid}></Id>
								</div>
								<div className='flex flex-col w-full'>
									<span className='mb-2 flex text-sixth text-1/1'>Agregar Imagen</span>
									<InputAddImage name='imageFileId' form={form} galleryId='modalGallery' file={initialValues.image}></InputAddImage>
								</div>
								<div className='flex flex-col w-full'>
									<span className='mb-2 flex text-sixth text-1/1'>Nombre de la categoría</span>
									<InputText name='name' placeholder='Nombre de la categoría' />
								</div>
								<div className='flex flex-col w-full'>
									<span className='flex text-sixth text-1/1 mb-2'>Descripción</span>
									<InputText name='description' placeholder='Descripción' />
								</div>

								<div className='flex flex-col w-full'>
									<span className='flex text-sixth text-1/1'>Categoría padre</span>
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
