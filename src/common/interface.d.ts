export interface IToastNotifyPromise {
	message: string;
	promise: Promise<unknown>;
}

type EventType = 'change';

export interface IFile {
	id: number;
	uuid: string;
	collectionName: string;
	compress: string;
	dir: string;
	encoding: string;
	fileName: string;
	mimeType: string;
	size: number;
	updatedAt: Date;
	createdAt: string;
	id_selected?: string;
}
export interface IFileSelected extends IFile {
	selected?: boolean;
}

export interface IFileState {
	files: IFile[];
}

export interface IItem {
	fn: Function;
	parameter: any;
}
export interface ICombined {
	array: any[];
	data: any[];
}
export interface TypeGeneric {
	number: string;
	string: string;
}

export interface IResFiles {
	records: {
		cant: number;
		limit: number;
	};
	results: IFile[];
}
// Products

export interface IProduct {
	uuid_product: string;
	uuid_autor: string;
	name_product: string;
	description: string;
	id_empresa: string;
	id_category: string;
	id_subcategory: string;
	tags: Array<object>;
	season: string;
	gender: string;
	colors: Array<string>;
	quantity: string;
	price: string;
	discount: string;
	images: IFile[];
	videos?: Array<object>;
	url: string;
	proveedor?: string;
	status: boolean;
	index_page: boolean;
	meta_description: string;
	meta_keywords: string;
	updated_at?: Date;
}
export interface IProductSelected extends IProduct {
	selected?: boolean;
}

export interface IResProducts {
	records: {
		cant: number;
		limit: number;
	};
	results: IProduct[];
}

export interface ICategory {
	uuid: string;
	name: string;
	description: string;
	parentCategoryId: null;
	metaDescription: string;
	metaKeywords: string;
	imageFileId: null | string;
	createdAt: Date;
	updatedAt: Date;
	status: boolean;
	childCategories?: ICategory[];
	notes: object[];
}

export interface Note {
	title: string;
	description: string;
	content: string;
}
