import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFile, IFileSelected } from '../../../common/interface.global';
import { callbacks } from '@/common/callback';
import { ToastNotify } from '@/common/toaster';
interface ManageAddFile {
	modalactive: boolean;
}
interface ModalFilesManageState {
	modalactive: boolean;
	files: IFile[] & { selected?: boolean }[];
	filesSelected: IFile & { selected?: boolean };
}

const modalfilesManageSlice = createSlice({
	name: 'modalfilesManageSlice',
	initialState: {
		modalactive: false,
		files: [] as IFile[] & { selected?: boolean }[],
		filesSelected: {} as IFile,
	} as ModalFilesManageState,
	reducers: {
		updateFilesMoodal: (state, action: PayloadAction<IFile[]>) => {
			state.files = action.payload;
		},
		selectFile: (state, action: PayloadAction<IFile & { selected?: boolean }>) => {
			state.filesSelected = action.payload;
			state.files = state.files.map((file: IFileSelected) => {
				if (file.uuid === action.payload.uuid) {
					file.selected = !file.selected;
				} else {
					file.selected = false;
				}
				return file;
			});
		},
		definitiveSelectFile: state => {
			// send data to other store
			try {
				if (callbacks.fn !== undefined && state.filesSelected.uuid !== undefined) {
					let file = JSON.parse(JSON.stringify(state.filesSelected));
					callbacks.fn((files: any) => {
						let search = files.find((element: IFile, index: number) => {
							if (element.uuid === file.uuid) {
								return true;
							}
						});
						if (search !== undefined) {
							ToastNotify({ message: 'Ya has agregado esta imagen, selecciona una diferente', options: { type: 'warning', position: 'top-right' } });
							return files;
						} else {
							let data = [...files, file];
							return data;
						}
					});
					state.modalactive = false;
					state.filesSelected = {} as IFile;
					callbacks.fn = null;
				} else {
					ToastNotify({ message: 'Selecciona al menos una imagen', options: { type: 'warning', position: 'bottom-left' } });
				}
			} catch (error) {
				console.error(error);
			}
		},
		showModal: (state, action: PayloadAction<ManageAddFile>) => {
			state.modalactive = action.payload.modalactive;
		},
		closeModal: state => {
			state.modalactive = false;
			callbacks.fn = () => {};
		},
	},
});

export const { showModal, closeModal, updateFilesMoodal, selectFile, definitiveSelectFile } = modalfilesManageSlice.actions;
export default modalfilesManageSlice.reducer;
