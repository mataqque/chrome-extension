import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFile, IFileSelected } from '../../../common/interface.global';

interface FilesManageState {
	files: IFile[] & { selected?: boolean }[];
	filesSelected: IFile[] & { selected?: boolean }[];
}

const filesManageSlice = createSlice({
	name: 'filesManage',
	initialState: {
		files: [] as IFile[] & { selected?: boolean }[],
		filesSelected: [] as IFile[] & { selected?: boolean }[],
	} as FilesManageState,
	reducers: {
		updateFiles: (state, action: PayloadAction<IFile[]>) => {
			state.files = action.payload;
		},
		selectFile: (state, action: PayloadAction<IFile>) => {
			state.files = state.files.map((file: IFileSelected) => {
				if (file.uuid === action.payload.uuid) {
					file.selected = !file.selected;
				}
				return file;
			});
			if (state.filesSelected.length === 0) {
				state.filesSelected.push(action.payload);
			} else {
				const index = state.filesSelected.findIndex((file: IFile) => file.uuid === action.payload.uuid);
				if (index === -1) {
					state.filesSelected.push(action.payload);
				} else {
					state.filesSelected.splice(index, 1);
				}
			}
		},
	},
});

export const { updateFiles, selectFile } = filesManageSlice.actions;
export default filesManageSlice.reducer;
