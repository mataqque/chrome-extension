import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFileSelected } from '../../common/interface';
const filesManageSlice = createSlice({
	name: 'filesManage',
	initialState: {
		filesSelected: [] as IFileSelected[],
		files: [],
	},
	reducers: {
		updateFiles: (state, action: PayloadAction<any>) => {
			return action.payload;
		},
		selectFile: (state, action: PayloadAction<IFileSelected>) => {
			let exist = state.filesSelected.find((file: IFileSelected) => file.fileName === action.payload.fileName);
			if (exist) {
				state.filesSelected = state.filesSelected.filter((file: IFileSelected) => file.fileName !== action.payload.fileName);
			} else {
				state.filesSelected.push(action.payload);
			}
			// state.filesSelected.push(action.payload);
		},
	},
});

export const { updateFiles, selectFile } = filesManageSlice.actions;
export default filesManageSlice.reducer;
