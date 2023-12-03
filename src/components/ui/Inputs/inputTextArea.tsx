import { useField } from 'formik';
import { IInputProps } from './interface';

export const InputTextArea = ({ name, form, placeholder, defaultValue }: IInputProps) => {
	const [field, meta, helpers] = useField({ name, form, defaultValue });
	return (
		<div className='w-full h-[10rem] relative'>
			<textarea {...field}></textarea>
		</div>
	);
};
