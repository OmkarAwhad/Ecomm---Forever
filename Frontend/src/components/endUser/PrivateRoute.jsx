import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ShopDataContext } from "../../context/ShopContext";

const PrivateRoute = () => {
	const { token } = useContext(ShopDataContext);
	if (!token) return <Navigate to="/login" replace />;
	return <Outlet />;
};

const UserPrivateRoute = () => {
	const { token, role } = useContext(ShopDataContext);
	if (!token || role !== "User") {
		return <Navigate to="/login" replace />;
	}
	return <Outlet />;
};

const AdminPrivateRoute = () => {
	const { token, role } = useContext(ShopDataContext);

	if (!token || role !== "Admin") {
		return <Navigate to="/login" replace />;
	}
	return <Outlet />;
};

export { PrivateRoute, UserPrivateRoute, AdminPrivateRoute };
