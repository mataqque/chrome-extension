import { FormContainer } from '../../../../../common/form';
import { InputText } from '../../../../../components/ui/Inputs/InputText';
import { FormikSubmitHandler, ParametersForm } from '../../../../schema';
import { noteSchema } from './schema';
import { ModalContext } from '../../../../../components/ui/modal/modal';
import { useContext, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { ICheckboxDataProps, ISelectDataProps } from '../../../../../components/ui/Inputs/interface';
import { getDataParentAndChild } from './fetch';
import { useCategoriesMutation } from '../../../../../store/api/categoryApi';
import { InputToggle } from '../../../../../components/ui/Inputs/inputToggle';
import { useDispatch } from 'react-redux';
import { useAddNotesMutation, useNotesMutation } from '../../../../../store/api/notesApi';
import { Id } from '../../../../../components/ui/Inputs/inputId';
import { InputMultiCheckbox } from '../../../../../components/ui/Inputs/inputMultiCheckbox';
import { ICategory } from '../../../../../common/interface';
import { updateNotes } from '../../../../../store/slice/notesSlide';
import { InputEditor } from '../../../../../components/ui/Inputs/inputEditor';
import { obsNote } from './obspopup';
import { obsModal } from '../../../../../components/ui/modal/obsModal';
import { toast } from 'react-toastify';

export const PopupNoteAdd = () => {
	const schemaType = noteSchema();
	const [data, setData] = useState<ICheckboxDataProps[]>([]);
	const dispatch = useDispatch();
	const [getDataNotes, {}] = useNotesMutation();
	const [getDataCategories, {}] = useCategoriesMutation();
	const [createNote, {}] = useAddNotesMutation();
	const { onClose } = useContext(ModalContext);
	const [initialValues, setInitialValues] = useState({
		status: true,
		uuid: '',
		title: '',
		description: '',
		content: '',
		categories: [] as any[],
		color: '',
	});

	const onSubmit: FormikSubmitHandler<Yup.InferType<typeof schemaType>> = async (values, form) => {
		const res: any = await createNote(values);
		if (res?.data?.status == 200) {
			const resNotes: any = await getDataNotes({ page: 1, cant: 10 });
			toast.success('Nota creada con éxito');
			obsModal.next({ ['popupNote']: { value: false } });
			dispatch(updateNotes(resNotes.data.data));
		}
	};
	useEffect(() => {
		getDataParentAndChild().then(res => {
			const data: ICheckboxDataProps[] = res.map((item: ICategory) => {
				return {
					value: item.uuid,
					label: item.name,
					...(item.childCategories ? { data: item.childCategories.map((child: ICategory) => ({ value: child.uuid, label: child.name })) } : {}),
				};
			});

			setData(data);
		});
		const subs = obsNote.subscribe(data => {
			setInitialValues(data);
		});
		return () => {
			subs.unsubscribe();
		};
	}, []);
	return (
		<div className='w-[70rem] max-h-[80vh] bg-white rounded-xl relative'>
			<div
				className='mask-center icon-close cursor-pointer absolute w-5 h-5 bg-gray-400 top-3 right-3 z-[1]'
				onClick={() => {
					onClose(false);
				}}
			/>
			<FormContainer initialValues={initialValues} onSubmit={onSubmit} validationSchema={noteSchema}>
				{(form: ParametersForm) => {
					const { handleSubmit, errors } = form;
					return (
						<form className='flex flex-col h-input rounded-5 w-full h-full p-6' onSubmit={handleSubmit}>
							<h2 className='text-1/5 text-sixth mb-4'>Crear nueva Nota</h2>
							<div className='grid grid-cols-[20rem,1fr] gap-5 mb-4'>
								<div className='flex flex-col min-w-[20rem] w-[20rem] gap-5'>
									<div className='flex flex-col w-full'>
										<span className='mb-2 flex text-sixth text-1/1 leading-none'>Estado</span>
										<InputToggle name='status' />
									</div>
									<div className='flex text-1/2 text-gray-500 leading-none'>
										ID : <Id name='uuid' form={form} defaultValue={initialValues.uuid}></Id>
									</div>
									<div className='flex flex-col w-full'>
										<span className=' flex text-sixth text-1/1 mb-0'>Titulo</span>
										<InputText name='title' placeholder='Nombre de la categoría' />
									</div>
									<div className='flex flex-col w-full'>
										<span className='flex text-sixth text-1/1 mb-0'>Descripción</span>
										<InputText name='description' placeholder='Descripción' />
									</div>
									<div className='flex flex-col w-full'>
										<span className='flex text-sixth text-1/1 mb-2'>Categoría relacionada</span>
										<fieldset className='overflow-x-auto h-[12rem]'>
											<InputMultiCheckbox
												name='categories'
												form={form}
												data={data}
												dataChecks={initialValues.categories.map(e => {
													return { value: e.categoriesUuid, label: e.notesUuid };
												})}
											></InputMultiCheckbox>
										</fieldset>
									</div>
									<button type='submit' className='cursor-pointer h-12 w-max bg-success p-4 text-white flex items-center justify-center rounded-md select-none ml-auto text-1/0'>
										Guardar los cambios
									</button>
								</div>
								<div className='flex flex-col w-full h-full my-0 py-0'>
									<span className='flex text-sixth text-1/1 mb-2'>Editor</span>
									<div className='w-full h-full border border-solid boder-black rounded-md'>
										<InputEditor name='content' form={form} data={initialValues.content} />
									</div>
								</div>
							</div>
						</form>
					);
				}}
			</FormContainer>
		</div>
	);
};
