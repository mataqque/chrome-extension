import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFileSelected } from '../../common/interface';
const filesManageSlice = createSlice({
	name: 'filesManageSlice',
	initialState: {
		files: [] as IFileSelected[],
	},
	reducers: {
		updateFiles: (state, action: PayloadAction<any>) => {
			state.files = action.payload;
		},
		selectMultiplyFile: (state, action: PayloadAction<IFileSelected>) => {
			console.log('payload', action.payload);
			const files = state.files.map((file: IFileSelected) => {
				if (file.uuid === action.payload.uuid) {
					file.selected = !file.selected;
					return file;
				}
				return file;
			});
			state.files = files;
			// state.filesSelected.push(action.payload);
		},
		selectSingleFile: (state, action: PayloadAction<IFileSelected>) => {},
	},
});

export const { updateFiles, selectMultiplyFile, selectSingleFile } = filesManageSlice.actions;
export default filesManageSlice.reducer;
export const allFiles = (state: any) => state.filesManageSlice.files;
export const deleteFilesSelected = (state: any) => {
	return state.filesManageSlice.files.filter((file: IFileSelected) => {
		return file.selected == true;
	});
};
