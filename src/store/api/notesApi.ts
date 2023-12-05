import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API_LOCAL } from '../config';
import { IPropsAddCategory, IPropsGetNote, IPropsUpdateNote } from './interface';

export const notesApi = createApi({
	reducerPath: 'notesApi',
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_API_LOCAL,
	}),
	endpoints: builder => ({
		notes: builder.mutation({
			query: ({ page = 1, cant = 10, uuid = '' }: IPropsGetNote) => {
				return {
					url: `/notes?page=${page}&cant=${cant}&category=${uuid}`,
					method: 'GET',
					headers: {
						authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				};
			},
		}),
		addNotes: builder.mutation({
			query: (data: IPropsUpdateNote) => {
				return {
					url: `/notes/add`,
					method: 'POST',
					data: {
						...data,
					},
				};
			},
		}),
	}),
});

export const { useNotesMutation, useAddNotesMutation } = notesApi;
