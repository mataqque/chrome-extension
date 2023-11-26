import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API_LOCAL } from '../config';
export const categoryApi = createApi({
	reducerPath: 'categoryApi',
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_API_LOCAL,
	}),
	endpoints: builder => ({
		categories: builder.mutation({
			query: ({ page = '', cant = '' }) => {
				return {
					url: `/categories/parents?page=${page}&cant=${cant}`,
					method: 'GET',
					headers: {
						authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				};
			},
		}),
		deleteCategory: builder.mutation({
			query: data => {
				return {
					url: `/files/delete`,
					method: 'POST',
					body: data,
				};
			},
		}),
		addCategory: builder.mutation({
			query: data => {
				return {
					url: `/files/add`,
					method: 'POST',
					body: data,
				};
			},
		}),
	}),
});

export const { useCategoriesMutation, useDeleteCategoryMutation } = categoryApi;
