import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFileSelected } from '../../common/interface';
const filesManageSlice = createSlice({
	name: 'filesManageSlice',
	initialState: {
		filesSelected: [] as IFileSelected[],
		files: [] as IFileSelected[],
	},
	reducers: {
		updateFiles: (state, action: PayloadAction<any>) => {
			state.files = action.payload;
		},
		selectMultiplyFile: (state, action: PayloadAction<IFileSelected>) => {
			let exist = state.filesSelected.find((file: IFileSelected) => file.fileName === action.payload.fileName);
			if (exist) {
				state.filesSelected = state.filesSelected.filter((file: IFileSelected) => file.fileName !== action.payload.fileName);
			} else {
				state.filesSelected.push(action.payload);
			}
			// state.filesSelected.push(action.payload);
		},
		selectSingleFile: (state, action: PayloadAction<IFileSelected>) => {
			state.filesSelected = [action.payload];
		},
	},
});

export const { updateFiles, selectMultiplyFile, selectSingleFile } = filesManageSlice.actions;
export default filesManageSlice.reducer;
