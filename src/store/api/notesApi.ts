import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API_LOCAL } from '../config';
import { IPropsAddCategory, IPropsUpdateNote } from './interface';

export const notesApi = createApi({
	reducerPath: 'notesApi',
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_API_LOCAL,
	}),
	endpoints: builder => ({
		notes: builder.mutation({
			query: ({ page = 1, cant = 10, uuid = '' }: IPropsUpdateNote) => {
				return {
					url: `/notes?page=${page}&cant=${cant}&category=${uuid}`,
					method: 'GET',
					headers: {
						authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				};
			},
		}),
	}),
});

export const { useNotesMutation } = notesApi;
