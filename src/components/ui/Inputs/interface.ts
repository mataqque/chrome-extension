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
export interface ISelectProps {
	name: string;
	form: any;
	label: string;
	data: { value: string; label: string }[];
	title?: string;
	defaultValue?: any;
	className?: string;
	icon?: any;
	color?: string;
	tabIndex?: number;
}
