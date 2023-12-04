import { useField } from 'formik';
import { IInputProps } from './interface';
import { Editor } from 'react-draft-wysiwyg';
import { config } from './configToolbar';
import { EditorState, convertToRaw, ContentState, convertFromRaw } from 'draft-js';
import { useState } from 'react';
import htmlToDraft from 'html-to-draftjs';
import { getInputClasses } from './helpers';

function jsonRaw(data: any) {
	return EditorState.createWithContent(convertFromRaw(data));
}
export const InputTextArea = ({ name, form, placeholder, defaultValue }: IInputProps) => {
	const [field, meta, helpers] = useField({ name, form, defaultValue });
	const [editorState, setEditorState] = useState();
	const onEditorStateChange = (data: any) => {
		setEditorState(data);
	};
	const onChange = (data: any) => {
		// console.log(data);
		helpers.setValue(JSON.stringify(data));
		helpers.setTouched(true);
	};
	return (
		<div className='w-full h-[10rem] relative'>
			<Editor
				editorState={editorState}
				onChange={onChange}
				onEditorStateChange={onEditorStateChange}
				toolbar={config}
				wrapperClassName={`wrapper-class ${getInputClasses(name, form)}`}
				editorClassName='editor-class'
				toolbarClassName='toolbar-class'
			/>
		</div>
	);
};
