import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import dashboardSlice from './slice/dashboardSlice';
import filesManageSlice from './slice/file_managerSlice';
// const middleware = [];

export const store = configureStore({
	reducer: {
		dashboardSlice,
		filesManageSlice,
	},
	// middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middleware),
});

// setupListeners(store.dispatch)
