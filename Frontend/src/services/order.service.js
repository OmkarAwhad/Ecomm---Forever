import api from "./apiConnector.service";

export const placeCOD = async (orderData) => {
	const res = await api.post("/order/place", orderData);
	return res.data;
};

export const placeStripe = async (orderData) => {
	const res = await api.post("/order/stripe", orderData);
	return res.data;
};

export const verifyStripe = async (payload) => {
	const res = await api.post("/order/verifyStripe", payload);
	return res.data;
};

export const placeRazorpay = async (orderData) => {
	const res = await api.post("/order/razorpay", orderData);
	return res.data;
};

export const verifyRazorpay = async (payload) => {
	const res = await api.post("/order/verifyRazorpay", payload);
	return res.data;
};

export const userOrders = async () => {
	const res = await api.post("/order/userorders", {});
	return res.data;
};
