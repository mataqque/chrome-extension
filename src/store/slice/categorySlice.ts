import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategory, IFileSelected } from '../../common/interface';
const categorySlice = createSlice({
	name: 'categorySlice',
	initialState: {
		categoriesSelected: [] as ICategory[],
		categories: [] as ICategory[],
	},
	reducers: {
		updateCategories: (state, action: PayloadAction<any>) => {
			state.categories = action.payload;
		},
		selectCategory: (state, action: PayloadAction<ICategory>) => {
			let exist = state.categoriesSelected.find((file: ICategory) => file.uuid === action.payload.uuid);
			if (exist) {
				state.categoriesSelected = state.categoriesSelected.filter((file: ICategory) => file.uuid !== action.payload.uuid);
			} else {
				state.categoriesSelected.push(action.payload);
			}
		},
	},
});

export const { updateCategories, selectCategory } = categorySlice.actions;
export default categorySlice.reducer;
