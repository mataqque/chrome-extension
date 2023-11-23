import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import dashboardSlice from './slice/dashboardSlice';
// const middleware = [];

export const store = configureStore({
	reducer: {
		dashboardSlice,
	},
	// middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middleware),
});

// setupListeners(store.dispatch)
