/* eslint-disable no-unused-vars */
import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Product from "./pages/Product";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
	return (
		<div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] ">
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/collection" element={<Collection />} />
				<Route path="about" element={<About />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/product/:productId" element={<Product />} />
				<Route path="/cart" element={<Cart />} />
				<Route path="/orders" element={<Orders />} />
				<Route path="/login" element={<Login />} />
				<Route path="/place-order" element={<PlaceOrder />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;