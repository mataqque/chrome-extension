import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API_LOCAL } from '../../home/config';
export const filesManageApi = createApi({
	reducerPath: 'filesApi',
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_API_LOCAL,
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
				return {
					url: `/files/delete`,
					method: 'POST',
					body: data,
				};
			},
		}),
	}),
});

export const { useGetFilesMutation, useDeleteFilesMutation } = filesManageApi;
