import { createSlice, PayloadAction } from '@reduxjs/toolkit';
const filesManageSlice = createSlice({
	name: 'filesManage',
	initialState: {},
	reducers: {
		updateFiles: (state, action: PayloadAction<any>) => {
			return action.payload;
		},
		selectFile: (state, action: PayloadAction<any>) => {
			return action.payload;
		},
	},
});

export const { updateFiles, selectFile } = filesManageSlice.actions;
export default filesManageSlice.reducer;
