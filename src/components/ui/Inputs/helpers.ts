export const getValidClass = (meta: any) => {
	try {
		const { error, touched } = meta;
		if (!error && !touched) {
			return '';
		}
		if (error && touched) {
			return '--invalid';
		}
		if (!error && touched) {
			return '--valid';
		}
	} catch (err) {
		// console.error(err);
	}
};
export const getInputClasses = (name: string, form: any) => {
	try {
		const { errors, touched } = form;
		if (!errors.name && !touched.name) {
			return '';
		}
		if (errors.name && touched.name) {
			return '--invalid';
		}
		if (!errors.name && touched.name) {
			return '--valid';
		}
	} catch (err) {
		// console.error(err);
	}
};
