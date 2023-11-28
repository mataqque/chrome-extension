import { useState, useRef, useEffect } from 'react';
import { IconInputSelect } from './iconInputs';
import down from '../../../assets/multimedia/icons/down.svg?url';
import { ISelectProps } from './interface';
import { dispatchEvent, dispatchEventSelect } from '../../../common/helpers';
import { setInputTextProps } from '../../../common/form';

const getInputClasses = (name: string, form: any) => {
	const { errors, touched } = form;
	if (!errors[name] && !touched[name]) {
		return '';
	}
	if (errors[name] && touched[name]) {
		return '--invalid';
	}
	if (!errors[name] && touched[name]) {
		return '--valid';
	}
};
export const InputSelect = (props: ISelectProps) => {
	const { title, name, label, form, color, defaultValue = '', ...rest } = props;
	const [showOptions, setShowOptions] = useState<unknown>('');
	const [valueSelect, setValueSelect] = useState<string>(label || '');
	const InputRef = useRef<HTMLSelectElement>(null);
	const changeValue = (value: string, label: string) => {
		setValueSelect(label);
		setShowOptions(false);
		dispatchEventSelect(InputRef.current, 'change', value);
	};
	const openOptions = () => {
		InputRef.current?.focus();
		setShowOptions(!showOptions);
	};
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (InputRef.current && !InputRef.current.contains(event.target as Node) && event.target !== InputRef.current?.parentNode?.querySelector('.select-none')) {
				setShowOptions(false);
			}
		};

		const handleDocumentClick = (event: MouseEvent) => {
			if (showOptions) {
				handleClickOutside(event);
			}
		};

		document.addEventListener('click', handleDocumentClick);

		return () => {
			document.removeEventListener('click', handleDocumentClick);
		};
	}, [showOptions]);
	return (
		<div className={`content-input ${rest?.className ? rest.className : ''}`}>
			{title && <label className='text-letter flex mb-1'>{title}</label>}
			<div className={`content-sub-input relative select-none ${props.icon ? 'include-icon' : ''}`}>
				<select
					className={`w-full text-transparent border border-solid border-gray-200 h-12 px-4 rounded-lg text-secondary placeholder:text-gray-300 ${getInputClasses(name, form)}`}
					autoComplete='off'
					tabIndex={props.tabIndex || 0}
					defaultValue={defaultValue || ''}
					{...setInputTextProps(name, form)}
					ref={InputRef}
				>
					{props.data.map((item: any, index: number) => {
						const { label, value } = item;
						return (
							<option key={index} value={value}>
								{label}
							</option>
						);
					})}
				</select>
				<div className='input select-none absolute top-0 left-0 w-full h-12 flex items-center pl-4 text-gray-400' onClick={() => openOptions()}>
					{props.icon && (
						<div className='w-[35px] top-0 bottom-0 left-[1px] flex items-center justify-center h-12'>
							<div style={{ WebkitMaskImage: `url(${props.icon.src})` }} className='mask-center w-5 h-5 bg-gray-300 '></div>
						</div>
					)}
					{valueSelect}
				</div>
				<IconInputSelect open={showOptions} class={'bg-gray-300'}></IconInputSelect>
				<div
					className={`options border border-solid bg-white border-gray-200 shadow rounded-lg overflow-hidden absolute top-0 bottom-0 top-[calc(100%+2px)] w-full z-[2] h-0 
					${showOptions === true ? 'active' : ''} ${showOptions === false ? 'close' : ''}`}
					color={color}
				>
					<div className='overflow-hidden h-full'>
						<div className='content-options scroll max-h-10rem' style={{ scrollbarColor: `${color}` }}>
							{props.data.map((item: any, index: number) => {
								const { label, value } = item;
								return (
									<div key={index + 'option'} className='option px-4 py-2 h-10 min-h-10 hover:bg-[#f2f2f2] cursor-pointer text-gray-500' onClick={() => changeValue(value, label)}>
										{item.label}
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
