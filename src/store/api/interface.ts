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
	status: boolean;
	uuid: string;
	title: string;
	description: string;
	content?: string;
	categories?: any[];
	color?: string;
}

export interface IPropsDeleteNote {
	uuid: string;
}
export interface IPropsSearchNote {
	search: string;
}

export interface INote {
	status: boolean;
	uuid: string;
	title: string;
	description: string;
	content: string;
	color: string;
	createdAt: Date;
	updatedAt: Date;
	categories?: any[];
}
