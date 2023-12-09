import { useField } from 'formik';
import { ICheckboxDataProps, IMultiplyCheckBoxProps, ISelectDataProps } from './interface';
import { Box, Checkbox, FormControlLabel } from '@material-ui/core';
import { ChangeEvent, createContext, useContext, useState } from 'react';

const updateChecked = (checked: any, index: number, event: any) => {
	const newSetChecked = [...checked];
	newSetChecked[index] = !newSetChecked[index];

	if (newSetChecked.slice(1).some((item: boolean) => item === true)) {
		newSetChecked[0] = true;
	} else {
		newSetChecked[0] = false;
	}
	event(newSetChecked);
	return newSetChecked;
};

const checkAllTrue = (checks: any, event: any) => {
	const newSetChecked = checks.map((e: boolean) => (e = true));
	event(newSetChecked);
	return newSetChecked;
};
const checkAllFalse = (checks: any, event: any) => {
	const newSetChecked = checks.map((e: boolean) => (e = false));
	event(newSetChecked);
	return newSetChecked;
};
export const InputMultiCheckbox = ({ name, form, data }: IMultiplyCheckBoxProps) => {
	const [field, meta, helpers] = useField({ name, form });
	const event = (event: any) => {
		console.log(event);
		// helpers.setValue([{ value: 'flavio', label: 'flavio' }]);
	};
	return (
		<div>
			{data.map((item: ICheckboxDataProps) => {
				return <CheckBoxParent key={item.value} data={item} event={event}></CheckBoxParent>;
			})}
		</div>
	);
};

interface IContext {
	checked: any;
	setChecked: any;
}

const CheckBoxDataContext = createContext<IContext>({
	checked: [],
	setChecked: () => {},
});
const CheckBoxParent = ({ data, event }: { data: ICheckboxDataProps; event: Function }) => {
	const newData = [{ value: data.value, label: data.label }, data.data].flat();
	const checks = Array(newData.length).fill(true) || [];
	const [checked, setChecked] = useState(checks);

	const handleParent = () => {
		if (checked.every(e => e === true)) {
			setChecked(checkAllFalse(checked, event));
		} else if (checked.every(e => e === false)) {
			setChecked(checkAllTrue(checked, event));
		} else {
			setChecked(updateChecked(checked, 0, event));
		}
	};
	const handleChild = (index: number) => {
		setChecked(updateChecked(checked, index, event));
	};
	return (
		<CheckBoxDataContext.Provider value={{ checked, setChecked }}>
			<FormControlLabel
				label={data.label}
				key={data.value}
				className='input-checkbox'
				style={{ marginRight: '0', marginLeft: '0' }}
				control={
					<Checkbox
						checked={checked[0]}
						style={{ padding: '0', marginRight: '4px' }}
						indeterminate={!checked.slice(1).every(e => e === false) && checked.slice(1).some(e => e === false)}
						onChange={handleParent}
					/>
				}
			/>
			{data.data &&
				data.data.map((item: any, index: number) => {
					return (
						<Box sx={{ display: 'flex', flexDirection: 'column', ml: '24px' }} key={index + 'check'}>
							<FormControlLabel
								label={data.label}
								style={{ marginRight: '0', marginLeft: '0' }}
								control={
									<Checkbox
										checked={checked[index + 1]}
										style={{ padding: '4px' }}
										onChange={() => {
											handleChild(index + 1);
										}}
									/>
								}
							/>
						</Box>
					);
				})}
		</CheckBoxDataContext.Provider>
	);
};
