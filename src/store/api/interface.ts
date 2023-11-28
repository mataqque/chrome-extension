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
