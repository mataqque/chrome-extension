import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import dashboardSlice from './slice/dashboardSlice';
import filesManageSlice from './slice/file_managerSlice';
import categorySlice from './slice/categorySlice';
import { filesManageApi } from './api/filesApi';
import { categoryApi } from './api/categoryApi';

const middleware = [filesManageApi.middleware, categoryApi.middleware];

export const store = configureStore({
	reducer: {
		dashboardSlice,
		filesManageSlice,
		categorySlice,
		[categoryApi.reducerPath]: categoryApi.reducer,
		[filesManageApi.reducerPath]: filesManageApi.reducer,
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middleware),
});

// setupListeners(store.dispatch)
