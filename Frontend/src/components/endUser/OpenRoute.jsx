import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ShopDataContext } from "../../context/ShopContext";

const OpenRoute = () => {
	const { token, role } = useContext(ShopDataContext);

	if (token && role) {
		if (role === "User") {
			return <Navigate to="/" replace />;
		} else if (role === "Admin") {
			return <Navigate to="/admin" replace />;
		}
	}

	return <Outlet />;
};

export default OpenRoute;
