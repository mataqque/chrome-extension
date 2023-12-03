export interface IInputProps {
	name: string;
	placeholder?: string;
	defaultValue?: string;
	className?: string;
	form?: any;
	icon?: any;
	tabIndex?: number;
}

export interface IInputPropsDate {
	title?: string;
	type?: string;
	name: string;
	placeholder?: string;
	defaultValue?: string;
	value?: string;
	className?: string;
	form?: any;
	icon?: any;
	tabIndex?: number;
	disabledDate?: (date: Date) => boolean;
}

export interface ISelectDataProps {
	value: string;
	label: string;
}
export interface ISelectProps {
	name: string;
	form: any;
	data: ISelectDataProps[];
	className?: string;
	color?: string;
	tabIndex?: number;
}
