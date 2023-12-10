import { Editor } from '@monaco-editor/react';
import { IInputEditor } from './interface';
import { useField } from 'formik';
import { useEffect, useState } from 'react';

export const InputEditor = ({ name, form, data = '' }: IInputEditor) => {
	const [field, meta, helpers] = useField({ name });
	function handleEditorChange(value: any, event: any) {
		helpers.setValue(value);
	}
	return (
		<Editor
			key={name}
			height='100%'
			defaultLanguage='typescript'
			theme='vs-dark'
			value={data}
			onChange={handleEditorChange}
			options={{
				insertSpaces: true,
				tabSize: 6,
			}}
		/>
	);
};
