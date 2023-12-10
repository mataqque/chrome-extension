import { Editor } from '@monaco-editor/react';
import { IInputEditor } from './interface';
import { useField } from 'formik';

export const InputEditor = ({ name, form }: IInputEditor) => {
	const [field, meta, helpers] = useField(name);
	function handleEditorValidation(markers: any) {
		// model markers
		markers.forEach((marker: any) => console.log('onValidate:', marker.message));
	}
	function handleEditorChange(value: any, event: any) {
		helpers.setValue(value);
	}
	return (
		<Editor
			height='100%'
			defaultLanguage='typescript'
			theme='vs-dark'
			defaultValue='interface IUser {
            
        }'
			onValidate={handleEditorValidation}
			onChange={handleEditorChange}
			options={{
				insertSpaces: true,
				tabSize: 6,
			}}
		/>
	);
};
