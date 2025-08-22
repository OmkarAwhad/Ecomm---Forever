// App.js
import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Verify from "./pages/Verify";
import Signup from "./pages/Signup";
import ForgetPassword from "./pages/ForgetPassword";
import VerifyOTP from "./pages/VerifyOTP";
import ChangePassword from "./pages/ChangePassword";

import UserLayout from "./components/layouts/UserLayout";
import AdminLayout from "./components/layouts/AdminLayout";
import {
	AdminPrivateRoute,
	PrivateRoute,
	UserPrivateRoute,
} from "./components/endUser/PrivateRoute";
import OpenRoute from "./components/endUser/OpenRoute";
import { ShopDataContext } from "./context/ShopContext";

import AdminAdd from "./pages/AdminAdd";
import AdminList from "./pages/AdminList";
import AdminOrders from "./pages/AdminOrders";
import AdminHome from "./pages/AdminHome";

function App() {
	const { role, token, setToken } = useContext(ShopDataContext);

	return (
		<div className="px-0 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
			<ToastContainer />
			<Routes>
				<Route element={<OpenRoute />}>
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route
						path="/forget-password"
						element={<ForgetPassword />}
					/>
					<Route path="/verify-otp" element={<VerifyOTP />} />
					<Route
						path="/change-password"
						element={<ChangePassword />}
					/>
				</Route>

				<Route element={<UserPrivateRoute />}>
					<Route element={<UserLayout />}>
						<Route path="/" element={<Home />} />
						<Route
							path="/collection"
							element={<Collection />}
						/>
						<Route path="/about" element={<About />} />
						<Route path="/contact" element={<Contact />} />
						<Route
							path="/product/:productId"
							element={<Product />}
						/>
						<Route path="/cart" element={<Cart />} />
						<Route path="/orders" element={<Orders />} />
						<Route
							path="/place-order"
							element={<PlaceOrder />}
						/>
						<Route path="/verify" element={<Verify />} />
					</Route>
				</Route>

				{/* Admin Routes */}
				<Route element={<AdminPrivateRoute />}>
					<Route path="/admin" element={<AdminHome />}>
						<Route index element={<AdminLayout />} />
						<Route path="add" element={<AdminAdd />} />
						<Route path="list" element={<AdminList />} />
						<Route path="orders" element={<AdminOrders />} />
					</Route>
				</Route>

				<Route
					path="*"
					element={<Navigate to="/login" replace />}
				/>
			</Routes>
		</div>
	);
}

export default App;
