import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import dashboardSlice from './slice/dashboardSlice';
import filesManageSlice from './slice/file_managerSlice';
import { filesManageApi } from './api/filesApi';

const middleware = [filesManageApi.middleware];

export const store = configureStore({
	reducer: {
		dashboardSlice,
		filesManageSlice,
		[filesManageApi.reducerPath]: filesManageApi.reducer,
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middleware),
});

// setupListeners(store.dispatch)
