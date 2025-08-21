import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../endUser/Navbar";
import Footer from "../endUser/Footer";

function UserLayout() {
	return (
		<>
			<Navbar />
			<div className="mt-20" />
			<Outlet />
			<Footer />
		</>
	);
}

export default UserLayout;
