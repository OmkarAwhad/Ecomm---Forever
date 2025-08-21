import api from "./apiConnector.service";

export const listProducts = async () => {
	const res = await api.get("/product/list");
	return res.data;
};

export const singleProduct = async (id) => {
	const res = await api.post("/product/single-prod", { id });
	return res.data;
};
