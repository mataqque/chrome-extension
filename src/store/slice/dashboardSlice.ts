import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Sidebar from '../../home/dashboard/config';

const dashboardSlice = createSlice({
	name: 'dashboardSlice',
	initialState: {
		activeId: Sidebar.list_sidebars[0].list_items[0].id,
	},
	reducers: {
		changeId(state, action: PayloadAction<string>) {
			state.activeId = action.payload;
		},
	},
});

export const { changeId } = dashboardSlice.actions;
export default dashboardSlice.reducer;
