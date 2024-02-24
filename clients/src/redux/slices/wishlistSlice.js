import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
	name: "wishlist",
	initialState: {
		quantity: 0,
		products: [],
	},
	reducers: {
		addRemoveFromWishlist: (state, action) => {
			const item = state.products.filter(
				(product) => product._id === action.payload._id
			);
			if (item.length === 0) {
				state.products.push(action.payload);
			} else {
				state.products = state.products.filter(
					(product) => product._id !== action.payload._id
				);
			}
		},
		emptyWishlist: (state) => {
			state.quantity = 0;
			state.products = [];
		},
		addUsersPreviousProductsToWishlist: (state, action) => {
			state.products = [...action.payload];
			state.quantity = state.products.length;
		},
	},
});

export const { addRemoveFromWishlist,emptyWishlist,addUsersPreviousProductsToWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
