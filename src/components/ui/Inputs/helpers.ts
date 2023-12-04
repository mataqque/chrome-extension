export const getInputClasses = (name: string, form: any) => {
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
