import { useField } from 'formik';
import { generateId } from '../../../common/helpers';
import { useEffect, useMemo } from 'react';

export const Id = (props: { name: string; form?: any }) => {
	const { name, form } = props;
	const [field, meta, helpers] = useField(props);
	const id = useMemo(() => {
		return generateId({ type: 'number' });
	}, []);
	useEffect(() => {
		helpers.setValue(id);
	}, []);
	return (
		<div className=''>
			<span className='text-gray-500 text-1/2'>{id}</span>
		</div>
	);
};
