import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategory, IFileSelected } from '../../common/interface';
const categorySlice = createSlice({
	name: 'categorySlice',
	initialState: {
		categoriesSelected: {} as ICategory,
		categories: [] as ICategory[],
		subCategory: [] as ICategory[],
	},
	reducers: {
		updateCategories: (state, action: PayloadAction<any>) => {
			state.categories = action.payload;
		},
		updateSubCategories: (state, action: PayloadAction<any>) => {
			state.subCategory = action.payload;
		},
		selectCategory: (state, action: PayloadAction<ICategory>) => {
			state.categoriesSelected = action.payload;
		},
		deleteSubCategory: (state, action: PayloadAction<ICategory>) => {
			state.subCategory = state.subCategory.filter((item: ICategory) => item.uuid !== action.payload.uuid);
		},
	},
});

export const { updateCategories, selectCategory, updateSubCategories, deleteSubCategory } = categorySlice.actions;
export default categorySlice.reducer;
