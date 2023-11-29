import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API_LOCAL } from '../config';
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
		openFolder: builder.mutation({
			query: () => {
				return {
					url: `/files/open`,
					method: 'GET',
				};
			},
		}),
	}),
});

export const { useGetFilesMutation, useDeleteFilesMutation, useOpenFolderMutation } = filesManageApi;
