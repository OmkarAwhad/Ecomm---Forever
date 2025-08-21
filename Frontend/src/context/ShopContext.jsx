/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopDataContext = createContext();

const ShopContext = ({ children }) => {
	const currency = "$";
	const delivery_fee = 10;
	const backendUrl = import.meta.env.VITE_BACKEND_URL;
	const [search, setSearch] = useState("");
	const [showSearch, setShowSearch] = useState(true);
	const [cartItems, setCartItems] = useState([]);
	const [products, setProducts] = useState([]);
	const [token, setToken] = useState("");
	const [role, setRole] = useState("");
	const navigate = useNavigate();

	const addToCart = async (itemId, size) => {
		if (!size) {
			toast.error("Select Product Size");
			return;
		}

		try {
			const response = await axios.post(
				backendUrl + "/cart/add",
				{ itemId, size },
				{ headers: { Authorization: `Bearer ${token}` } } // Add Bearer prefix
			);
			if (response.data.success) {
				getUserCart(); // Refresh cart
				toast.success("Added to Cart");
			} else {
				toast.error(response.data.message);
			}
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	};

	const getCartCount = () => {
		return cartItems.reduce((total, item) => total + item.quantity, 0);
	};

	const updateQuantity = async (cartItemId, quantity) => {
		try {
			const response = await axios.post(
				backendUrl + "/cart/update",
				{ cartItemId, quantity },
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			if (response.data.success) {
				getUserCart(); // Refresh cart
			} else {
				toast.error(response.data.message);
			}
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	};

	const getCartAmount = () => {
		return cartItems.reduce(
			(total, item) => total + item.product.price * item.quantity,
			0
		);
	};

	const getProducts = async () => {
		try {
			const response = await axios.get(backendUrl + "/product/list");
			if (response.data.success) {
				setProducts(response.data.products);
			} else {
				toast.error(response.data.message);
			}
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	};

	const getUserCart = async () => {
		if (!token) {
			console.log("No token");
			return;
		}

		if (role !== "User") return;

		try {
			// console.log("Fetching cart with token:", token); // Debug log
			const response = await axios.post(
				backendUrl + "/cart/get",
				null,
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			if (response.data.success) {
				// console.log(response.data);
				setCartItems(response.data.cartData);
			} else {
				toast.error(response.data.message);
			}
		} catch (error) {
			console.log("Cart fetch error:", error);
			toast.error(error.message);
		}
	};

	const logout = async () => {
		navigate("/login");
		localStorage.removeItem("token");
		localStorage.removeItem("role");
		setToken("");
		setRole("");
		setCartItems({});
	};

	useEffect(() => {
		getProducts();
	}, []);

	useEffect(() => {
		const storedToken = localStorage.getItem("token");
		if (storedToken && !token) {
			setToken(storedToken);
		}

		const storedRole = localStorage.getItem("role");
		if (storedRole && !role) {
			// Trim the role to handle any existing data with whitespace
			const cleanRole = storedRole.trim();
			setRole(cleanRole);
			// Update localStorage with clean role
			if (cleanRole !== storedRole) {
				localStorage.setItem("role", cleanRole);
			}
		}
	}, [token, role]);

	useEffect(() => {
		if (token) {
			getUserCart();
		}
	}, [token]);

	const value = {
		products,
		currency,
		backendUrl,
		delivery_fee,
		search,
		setSearch,
		showSearch,
		setShowSearch,
		cartItems,
		addToCart,
		getCartCount,
		setCartItems,
		updateQuantity,
		getCartAmount,
		navigate,
		token,
		setToken,
		logout,
		role,
		setRole,
		getUserCart,
	};

	return (
		<ShopDataContext.Provider value={value}>
			{children}
		</ShopDataContext.Provider>
	);
};

export default ShopContext;
