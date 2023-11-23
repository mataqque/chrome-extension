import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalUploadSlice {
	activeModal: boolean;
}

const modalUploadSlice = createSlice({
	name: 'modalUploadSlice',
	initialState: {
		activeModal: false,
	} as ModalUploadSlice,
	reducers: {
		toggleModal: (state, action: PayloadAction<boolean>) => {
			state.activeModal = action.payload;
		},
	},
});

export const { toggleModal } = modalUploadSlice.actions;
export default modalUploadSlice.reducer;
