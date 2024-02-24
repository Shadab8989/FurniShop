import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: {
		currentUser: null,
		error: false,
	},
	reducers: {
		loginSuccess: (state, action) => {
			state.currentUser = action.payload;
		},
		loginFailure: (state) => {
			state.error = true;
		},
		logOut: (state) => {
			state.currentUser = null;
		},
		signInSuccess: (state, action) => {
			state.currentUser = action.payload;
		},
		signInFailure: (state) => {
			state.error = true;
		},
	},
});

export const { loginSuccess, loginFailure, logOut,signInSuccess,signInFailure } = userSlice.actions;
export default userSlice.reducer;
