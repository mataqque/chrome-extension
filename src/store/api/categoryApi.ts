import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API_LOCAL } from '../config';
import { IPropsAddCategory } from './interface';
export const categoryApi = createApi({
	reducerPath: 'categoryApi',
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_API_LOCAL,
	}),
	endpoints: builder => ({
		categories: builder.mutation({
			query: ({ page = 1, cant = 10 }: { page?: number; cant?: number }) => {
				return {
					url: `/categories/parents?page=${page}&cant=${cant}`,
					method: 'GET',
					headers: {
						authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				};
			},
		}),
		subcategories: builder.mutation({
			query: ({ parent = '', page = 1, cant = 10 }) => {
				return {
					url: `/categories/children?parent=${parent}&page=${page}&cant=${cant}`,
					method: 'GET',
					headers: {
						authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				};
			},
		}),
		parentsandchilds: builder.mutation({
			query: ({ parent = '', page = 1, cant = 100 }) => {
				return {
					url: `/categories/children?parent=${parent}&page=${page}&cant=${cant}`,
					method: 'GET',
					headers: {
						authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				};
			},
		}),
		deleteCategory: builder.mutation({
			query: ({ uuid }: { uuid: string }) => {
				return {
					url: `/categories/delete/${uuid}`,
					method: 'DELETE',
				};
			},
		}),
		addCategory: builder.mutation({
			query: (data: IPropsAddCategory) => {
				return {
					url: `/categories/add`,
					method: 'POST',
					body: data,
				};
			},
		}),
	}),
});

export const { useCategoriesMutation, useDeleteCategoryMutation, useAddCategoryMutation, useSubcategoriesMutation } = categoryApi;
