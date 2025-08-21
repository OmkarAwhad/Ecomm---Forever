import api from "./apiConnector.service";

export const loginUser = async (email, password) => {
	const res = await api.post("/user/login", { email, password });
	return res.data;
};

export const registerUser = async (name, email, password) => {
	const res = await api.post("/user/sign-up", { name, email, password });
	return res.data;
};
