import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import dashboardSlice from './slice/dashboardSlice';
import filesManageSlice from './slice/file_managerSlice';
import categorySlice from './slice/categorySlice';
import { filesManageApi } from './api/filesApi';
import { categoryApi } from './api/categoryApi';
import notesSlice from './slice/notesSlide';
import { notesApi } from './api/notesApi';

const middleware = [filesManageApi.middleware, categoryApi.middleware, notesApi.middleware];

export const store = configureStore({
	reducer: {
		dashboardSlice,
		filesManageSlice,
		notesSlice,
		categorySlice,
		[notesApi.reducerPath]: notesApi.reducer,
		[categoryApi.reducerPath]: categoryApi.reducer,
		[filesManageApi.reducerPath]: filesManageApi.reducer,
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middleware),
});

// setupListeners(store.dispatch)
