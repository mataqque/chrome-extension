import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import { IInputEditor } from './interface';
import { useField } from 'formik';
import { useEffect, useState } from 'react';

export const InputEditor = ({ name, form, data = '' }: IInputEditor) => {
	const [field, meta, helpers] = useField({ name });
	function handleEditorChange(value: any) {
		console.log('data', value);
		helpers.setValue(value);
	}
	return (
		<Editor
			value={field.value}
			onValueChange={handleEditorChange}
			highlight={code => highlight(code, languages.js, 'js')}
			padding={10}
			style={{
				fontFamily: '"Fira code", "Fira Mono", monospace',
				fontSize: 12,
			}}
		/>
	);
};
