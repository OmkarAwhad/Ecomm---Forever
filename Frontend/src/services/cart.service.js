import api from "./apiConnector.service";

export const getCart = async () => {
	const res = await api.post("/cart/get", {});
	return res.data;
};

export const addToCart = async (itemId, size) => {
	const res = await api.post("/cart/add", { itemId, size });
	return res.data;
};

export const updateCart = async (itemId, size, quantity) => {
	const res = await api.post("/cart/update", { itemId, size, quantity });
	return res.data;
};
