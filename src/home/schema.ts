import { FormikConfig } from 'formik';
import { FormEventHandler } from 'react';
import * as Yup from 'yup';

export type FormikSubmitHandler<T> = FormikConfig<T>['onSubmit'];
export interface ParametersForm {
	touched: any;
	errors: any;
	handleSubmit: FormEventHandler<HTMLFormElement>;
	isSubmitting: boolean;
}

export const homeSchema = (values?: any) =>
	Yup.object().shape({
		email: Yup.string().email().required(),
	});
