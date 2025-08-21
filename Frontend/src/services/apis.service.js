// Central place for all API paths
export const productApi = {
	LIST: "/product/list",
	SINGLE: "/product/single-prod",
};

export const cartApi = {
	ADD: "/cart/add",
	UPDATE: "/cart/update",
	GET: "/cart/get",
};

export const orderApi = {
	PLACE_COD: "/order/place",
	PLACE_STRIPE: "/order/stripe",
	VERIFY_STRIPE: "/order/verifyStripe",
	PLACE_RAZORPAY: "/order/razorpay",
	VERIFY_RAZORPAY: "/order/verifyRazorpay",
	USER_ORDERS: "/order/userorders",
};

export const userApi = {
	LOGIN: "/user/login",
	SIGNUP: "/user/sign-up",
};
