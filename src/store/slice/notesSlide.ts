import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategory, IFileSelected, Note } from '../../common/interface';
const notesSlice = createSlice({
	name: 'notesSlice',
	initialState: {
		notes: [] as Note[],
	},
	reducers: {
		updateNotes: (state, action: PayloadAction<any>) => {
			state.notes = action.payload;
		},
	},
});

export const { updateNotes } = notesSlice.actions;
export default notesSlice.reducer;
