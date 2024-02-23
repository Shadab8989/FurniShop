import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		products: [],
		quantity: 0,
		totalPrice: 0,
	},
	reducers: {
		addUsersPreviousProductsToCart: (state, action) => {
			state.totalPrice = 0;
			state.products = [...action.payload];
			state.quantity = state.products.length;
			state.products.forEach(item => state.totalPrice += item.product.price * item.amount)
		},
		emptyTheCart: (state) => {
			state.products = [];
			state.quantity = 0;
			state.totalPrice = 0
		},
		addProductToCart: (state, action) => {
			const item = state.products.filter(
				(elem) => elem.product._id === action.payload._id
			);
			console.log(item);
			if (item.length === 0) {
				state.products.push({ product: action.payload, amount: 1 });
				state.quantity = state.products.length;
				state.totalPrice += action.payload.price;
			}
		},
		removeProductFromCart: (state, action) => {
			if (state.quantity > 0) {
				state.products = state.products.filter(
					(item) => item.product._id !== action.payload._id
				);
				state.quantity = state.products.length;
				state.totalPrice -= action.payload.price;
			}
		},
		increaseProductQuantity: (state, action) => {
			for (let i = 0; i < state.products.length; i++) {
				if (state.products[i].product._id === action.payload._id) {
					state.products[i].amount += 1;
					state.totalPrice += action.payload.price;
				}
			}
		},
		decreaseProductQuantity: (state, action) => {
			for (let i = 0; i < state.products.length; i++) {
				if (state.products[i].product._id === action.payload._id) {
					if (state.products[i].amount > 1) {
						state.products[i].amount -= 1;
					} else {
						state.quantity -= 1;
						state.totalPrice -= state.products[i].product.price;
						state.products = state.products.filter(
							(item) => item.product._id !== action.payload._id
						);
						state.quantity = state.products.length;
					}
					state.totalPrice -= action.payload.price;
				}
			}
		},
	},
});

export const {
	addUsersPreviousProductsToCart,
	emptyTheCart,
	addProductToCart,
	removeProductFromCart,
	increaseProductQuantity,
	decreaseProductQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
