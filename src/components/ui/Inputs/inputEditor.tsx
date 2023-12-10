import { Editor } from '@monaco-editor/react';
import { IInputEditor } from './interface';
import { useField } from 'formik';
import { useEffect, useState } from 'react';

export const InputEditor = ({ name, form, data = '' }: IInputEditor) => {
	const [field, meta, helpers] = useField(name);
	const [value, setValue] = useState(data);
	function handleEditorValidation(markers: any) {
		// model markers
		markers.forEach((marker: any) => console.log('onValidate:', marker.message));
	}
	function handleEditorChange(value: any, event: any) {
		setValue(value);
		helpers.setValue(value);
	}
	useEffect(() => {
		helpers.setValue(value);
	}, [value]);
	return (
		<Editor
			height='100%'
			defaultLanguage='typescript'
			theme='vs-dark'
			defaultValue={value}
			onValidate={handleEditorValidation}
			onChange={handleEditorChange}
			options={{
				insertSpaces: true,
				tabSize: 6,
			}}
		/>
	);
};
