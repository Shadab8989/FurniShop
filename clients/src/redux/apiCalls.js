import {
	loginFailure,
	loginSuccess,
	logOut,
	signInFailure,
	signInSuccess,
} from "./slices/userSlice";
import { Request } from "../requestMethods";
import {
	addUsersPreviousProductsToCart,
	emptyTheCart,
} from "./slices/cartSlice";
import {
	addUsersPreviousProductsToWishlist,
	emptyWishlist,
} from "./slices/wishlistSlice";
import { addUsersPreviousOrders, emptyOrder } from "./slices/ordersSlice";

export const login = async (dispatch, user) => {
	try {
		const res = await Request.post("/auth/login", user);

		dispatch(loginSuccess(res.data));
		dispatch(addUsersPreviousProductsToCart(res.data.cartItems));
		dispatch(addUsersPreviousProductsToWishlist(res.data.wishlistItems));
		dispatch(addUsersPreviousOrders(res.data.orderedItems));
	} catch (error) {
		alert(error.response.data.message);
		dispatch(loginFailure());
	}
};

export const logout = async (dispatch) => {
	try {
		dispatch(logOut());
		dispatch(emptyTheCart());
		dispatch(emptyWishlist());
		dispatch(emptyOrder());
	} catch (error) {
		console.log(error);
	}
};

export const signIn = async (dispatch, user) => {
	try {
		const res = await Request.post("/auth/register", user);

		dispatch(signInSuccess(res.data));
	} catch (error) {
		if (error.response.data.message.includes("username")) {
			alert("User with this username already exists");
		}
		if (error.response.data.message.includes("email")) {
			alert("User with this email already exists");
		}
		dispatch(signInFailure());
	}
};

export const addProductToDbCart = async (productsInCart, user, product) => {
	const userId = user._id;
	const productExists = productsInCart.filter(
		(item) => item.product._id === product._id
	);
	if (productExists.length !== 0) {
		alert("product already in the cart");
	} else {
		try {
			const res = await Request.patch(`users/addtocart/${userId}`, product);
		} catch (error) {
			console.log(error);
		}
	}
};
export const updateAmount = async (user, product) => {
	const userId = user._id;
	try {
		const res = await Request.patch(`users/incrementamount/${userId}`, product);
	} catch (error) {
		console.log(error);
	}
};

export const removeProductFromDbCart = async (user, product) => {
	const userId = user._id;
	try {
		const res = await Request.patch(`users/removefromcart/${userId}`, product);
	} catch (error) {
		console.log(error);
	}
};

export const addRemoveFromDbWishlist = async (
	productsInWishlist,
	user,
	product
) => {
	const userId = user._id;
	const productExists = productsInWishlist.filter(
		(item) => item._id === product._id
	);
	if (productExists.length === 0) {
		try {
			const res = await Request.patch(`users/addtowishlist/${userId}`, product);
		} catch (error) {
			console.log(error);
		}
	} else {
		try {
			const res = await Request.patch(
				`users/removefromwishlist/${userId}`,
				product
			);
		} catch (error) {
			console.log(error);
		}
	}
};

export const addProductToDbOrders = async (user, order) => {
	const userId = user._id;
	try {
		const res = await Request.patch(`/users/addtoorders/${userId}`, order);
	} catch (error) {
		console.log(error);
	}
};
