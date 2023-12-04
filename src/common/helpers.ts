import { ISelectDataProps } from '../components/ui/Inputs/interface';
import { ICombined, Item, TypeGeneric } from './ihelpers';
import { EventType, IFile } from './interface';

export const resumeText = (text: string, number: number) => {
	if (text.length <= number) {
		return text;
	} else {
		return text.slice(0, number) + '...';
	}
};
export const addShy = (text: string) => {
	const shy = '\u00AD';
	return text.slice(0, 20) + shy + text.slice(20);
};

export const generateUrl = (props: IFile, host?: string): string => {
	try {
		const { fileName = 'no-image.png', dir = 'no-image.png' } = props;
		if (host) {
			return host + '/' + dir + '/' + fileName;
		}
		let url = dir + '/' + fileName;
		return url;
	} catch (error) {
		console.log(error);
		return '';
	}
};
export const combinedFilters = ({ array = [], data = [] }: ICombined) => {
	let result: any[] = data || [];
	array.forEach((item: Item, index: number) => {
		result = item.fn(result, item.parameter);
	});
	return result;
};

export const generateId = ({ type }: { type: string }): string => {
	const typeid: TypeGeneric = {
		number: new Date().getTime().toString(),
		string: Math.random().toString(36).substr(2, 18),
	};
	const typeIdDefault: string = typeid.string;
	return typeid[type as keyof TypeGeneric] || typeIdDefault;
};

export const dispatchEvent = (element: HTMLInputElement, event: EventType, value: string) => {
	element.setAttribute('value', value);
	element.value = value;
	element.dispatchEvent(new Event(event, { bubbles: true }));
};
export const dispatchEventSelect = (element: any, event: any, value: string) => {
	if (value !== null) {
		element.value = value;
		element.dispatchEvent(new Event(event, { bubbles: true }));
	}
};

export const verifyExtension = (file: any) => {
	let extension = file.fileName.split('.').pop();
	if (extension == 'pdf') {
		return 'file.png';
	} else if (extension == 'mp4') {
		return 'video.png';
	} else if (extension == 'mp3') {
		return 'file.png';
	} else if (
		extension == 'webp' ||
		extension == 'jpg' ||
		extension == 'png' ||
		extension == 'jpeg' ||
		extension == 'gif' ||
		extension == 'svg' ||
		extension == 'PNG' ||
		extension == 'JPG' ||
		extension == 'JPEG' ||
		extension == 'GIF' ||
		extension == 'SVG'
	) {
		return file.compress.length > 0 ? file.compress : file.file_name;
	} else {
		return 'file.png';
	}
};

export const bytesToSize = (bytes: number): string => {
	const sizes = ['Bytes', 'Kb', 'Mb', 'gb', 'Tb'];
	if (bytes === 0) {
		return '0 Byte';
	}
	const i = Math.floor(Math.log(bytes) / Math.log(1024));
	return `${Math.round(bytes / Math.pow(1024, i))} ${sizes[i]}`;
};

export const convertToDate = (date: string) => {
	if (date == undefined) return '';
	let date_ = new Date(date);
	return date_.toLocaleDateString('es-Es', { year: 'numeric', month: 'long', day: 'numeric' });
};

interface IResponse {
	status: number;
	data: unknown;
}

export const HandleResponse = (callback: Function, response: IResponse, callbackError: Function) => {
	switch (response.status) {
		case 200:
			callback(response.data);
			break;
		case 401:
			break;
		case 500:
			callbackError();
			break;
	}
};

export const getCheckables = (container: string) => {
	// get values of checked checkboxes
	const checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll(`${container} input[type="checkbox"]`);
	const values = [];
	for (let i = 0; i < checkboxes.length; i++) {
		if (checkboxes[i].checked) {
			values.push(checkboxes[i].value);
		}
	}
	return values;
};
export const disableCheckables = (container: string) => {
	const checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll(`${container} input[type="checkbox"]`);
	checkboxes.forEach(e => {
		e.checked = false;
	});
};

export const partials = (data: any, label: string): ISelectDataProps[] => {
	let res = data.map((e: any) => {
		return { value: e.uuid, label: e.name };
	});
	res.unshift({ value: '', label: label });
	console.log(res);
	return res;
};
export const delayfunc = (func: Function, time: number) => {
	return new Promise((resolve: any) => {
		let delay = setTimeout(() => {
			func();
			clearTimeout(delay);
			resolve();
		}, time);
	});
};

export const uncheckAllChecbox = (ElementContent: string) => {
	const checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll(ElementContent + ' input[type="checkbox"]');
	for (let i = 0; i < checkboxes.length; i++) {
		checkboxes[i].checked = false;
	}
};

export const checkAllChecbox = (ElementContent: string) => {
	const checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll(ElementContent + ' input[type="checkbox"]');
	for (let i = 0; i < checkboxes.length; i++) {
		checkboxes[i].checked = true;
	}
};

export const currentConvert = (price: number | string) => {
	return price ? price.toLocaleString('es-PE', { style: 'currency', currency: 'PEN' }) : 'S/ 00.00';
};

export const dateToString = (date: Date) => {
	let year = date.getFullYear();
	let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Sumar 1 al mes porque en JavaScript los meses van de 0 a 11
	let day = date.getDate().toString().padStart(2, '0');
	let formattedDate = `${year}-${month}-${day}`;
	return formattedDate;
};

export const stringToDate = (date: string) => {
	let [year, month, day] = date.split('-');
	return new Date(+year, +month - 1, +day);
};

export const generatePath = (file: IFile) => {
	return `${file.dir}/${file.fileName}`;
};
export const copyToClipboard = (text: string) => {
	try {
		let textarea = document.createElement('textarea') as HTMLTextAreaElement;
		textarea.value = text;
		textarea.style.position = 'fixed';
		textarea.style.top = '0';
		textarea.style.left = '0';
		textarea.style.opacity = '0';
		textarea.style.pointerEvents = 'none';
		document.body.appendChild(textarea);
		textarea.focus();
		textarea.select();
		document.execCommand('copy');
	} catch (error) {
		console.error(error);
	}
};
