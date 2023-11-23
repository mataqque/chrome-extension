import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL_BASE_API_BACKEND } from '../../config';
export const filesApi = createApi({
	reducerPath: 'filesApi',
	baseQuery: fetchBaseQuery({
		baseUrl: URL_BASE_API_BACKEND,
	}),
	endpoints: builder => ({
		getFiles: builder.mutation({
			query: (search: string) => {
				return {
					url: `/files/getFiles${search || ''}`,
					method: 'GET',
					headers: {
						authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				};
			},
		}),
		deleteFiles: builder.mutation({
			query: data => {
				// console.log(id, patch);
				return {
					url: `/files/delete`,
					method: 'POST',
					body: data,
					// headers: {
					// 	authorization: `Bearer ${localStorage.getItem('token')}`,
					// },
				};
			},
		}),
	}),
});

export const { useGetFilesMutation, useDeleteFilesMutation } = filesApi;
