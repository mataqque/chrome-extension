export interface IFile {
	id: number;
	uuid: string;
	collection_name: string;
	compress: string;
	dir: string;
	encoding: string;
	fileName: string;
	mime_type: string;
	size: number;
	updated_at: string;
	created_at: string;
	id_selected?: string;
}
export interface IFileState {
	files: IFile[];
}
