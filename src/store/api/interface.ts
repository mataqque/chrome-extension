export interface IPropsAddCategory {
	uuid?: string;
	name: string;
	description?: string | null;
	parentCategoryId?: string | null;
	metaDescription?: string | null;
	metaKeywords?: string | null;
	imageFileId?: string | null;
	status?: boolean | null;
}

export interface IPropsGetNote {
	page?: number;
	cant?: number;
	uuid?: string;
}
export interface IPropsUpdateNote {
	uuid: string;
	status: boolean;
	title: string;
	content?: string;
	description?: string;
	categoryId?: string;
}
