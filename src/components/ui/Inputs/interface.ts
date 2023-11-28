export interface IInputProps {
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
	label: string;
	data: ISelectDataProps[];
	title?: string;
	defaultValue?: any;
	className?: string;
	icon?: any;
	color?: string;
	tabIndex?: number;
}
