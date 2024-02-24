import { createSlice } from "@reduxjs/toolkit";

const ordersSlice = createSlice({
	name: "cart",
	initialState: {
		ordersArray: [],
	},
	reducers: {
		addUsersPreviousOrders: (state, action) => {
			state.ordersArray = [...action.payload];
		},
		addToOrders: (state, action) => {
			state.ordersArray.unshift(action.payload);
		},
		emptyOrder: (state) => {
			state.ordersArray = [];
		},
	},
});

export const { addUsersPreviousOrders, addToOrders,emptyOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
