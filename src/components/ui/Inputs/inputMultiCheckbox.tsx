import { useField } from 'formik';
import { ICheckboxDataProps, IMultiplyCheckBoxProps, ISelectDataProps } from './interface';
import { Box, Checkbox, FormControlLabel } from '@material-ui/core';
import { ChangeEvent, createContext, useContext, useEffect, useState } from 'react';

interface IEvent {
	list: any[];
	index: number;
}

function TreeChecks(dataAll: any, dataChecks: any) {
	const data1 = dataAll.map((item: any) => {
		return [{ value: item.value, label: item.label }, ...(item.data ? item.data : [])].flat().filter(Boolean);
	});
	const data2 = dataChecks
		.map((item: any) => {
			return [{ value: item.value, label: item.label }, ...(item.data ? item.data : [])].flat().filter(Boolean);
		})
		.flat();
	return data1.map((item: any, index: number) => {
		const _res = item.map((item: any) => {
			if (data2.find((e: any) => e.value == item.value)) {
				return true;
			} else {
				return false;
			}
		});
		return _res;
	});
}

export const InputMultiCheckbox = ({ name, form, data, dataChecks }: IMultiplyCheckBoxProps) => {
	console.log(data, dataChecks);
	const checkBoolean = TreeChecks(data, dataChecks);
	const [allChecked, setAllChecked] = useState<any[]>([]);
	const [field, meta, helpers] = useField({ name, form });
	const event = ({ list, index }: IEvent) => {
		const newData = allChecked;
		newData[index] = list;
		setAllChecked(newData);
		helpers.setValue(
			newData
				.filter(e => {
					if (e.length > 0) return e;
				})
				.flat()
		);
	};
	length;
	return (
		<div className=''>
			{data.map((item: ICheckboxDataProps, pos: number) => {
				return <CheckBoxParent key={item.value} data={item} event={event} pos={pos} checkBoolean={checkBoolean[pos]}></CheckBoxParent>;
			})}
		</div>
	);
};

const compareToData = (data: any[], checks: boolean[]) => {
	return data
		.map((e, index: number) => {
			if (checks[index] == true) {
				return e;
			}
		})
		.filter(Boolean);
};
const CheckBoxParent = ({ data, event, pos, checkBoolean }: { data: ICheckboxDataProps; pos: number; event: (data: IEvent) => void; checkBoolean: boolean[] }) => {
	const newData = [{ value: data.value, label: data.label }, data.data].flat();
	const [checked, setChecked] = useState(checkBoolean);

	//reusable functions
	const updateChecked = (checked: any, index: number) => {
		const newSetChecked = [...checked];
		newSetChecked[index] = !newSetChecked[index];

		if (newSetChecked.slice(1).some((item: boolean) => item === true)) {
			newSetChecked[0] = true;
		}
		event({ list: compareToData(newData, newSetChecked), index: pos });
		return newSetChecked;
	};

	const checkAllTrue = (checks: any) => {
		const newSetChecked = checks.map((e: boolean) => (e = true));
		event({ list: compareToData(newData, newSetChecked), index: pos });
		return newSetChecked;
	};
	const checkAllFalse = (checks: any) => {
		const newSetChecked = checks.map((e: boolean) => (e = false));
		event({ list: compareToData(newData, newSetChecked), index: pos });
		return newSetChecked;
	};
	//end reusable functions

	const handleParent = () => {
		if (checked.every(e => e === true)) {
			setChecked(checkAllFalse(checked));
		} else if (checked.every(e => e === false)) {
			setChecked(checkAllTrue(checked));
		} else {
			setChecked(updateChecked(checked, 0));
		}
	};
	const handleChild = (index: number) => {
		setChecked(updateChecked(checked, index));
	};
	useEffect(() => {
		const newSetChecked = [...checked];
		event({ list: compareToData(newData, newSetChecked), index: pos });
	}, []);
	return (
		<div className='py-1'>
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
								label={item.label}
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
		</div>
	);
};
