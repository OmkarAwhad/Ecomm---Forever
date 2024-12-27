/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
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
	const [showSearch, setShowSearch] = useState(false);
	const [cartItems, setCartItems] = useState({});
	const [products, setProducts] = useState([]);
	const [token, setToken] = useState("");
	const navigate = useNavigate();

	const addToCart = async (itemId, size) => {
		if (!size) {
			toast.error("Select Product Size");
			return;
		}

		let cartData = structuredClone(cartItems);
		// if cart already has that item
		if (cartData[itemId]) {
			if (cartData[itemId][size]) {
				cartData[itemId][size] += 1;
			} else {
				cartData[itemId][size] = 1;
			}
		} else {
			// new entry
			cartData[itemId] = {};
			cartData[itemId][size] = 1;
		}

		setCartItems(cartData);

		if (token) {
			try {
				await axios.post(
					backendUrl + "/cart/add",
					{ itemId, size },
					{ headers: { token } }
				);
			} catch (error) {
				console.log(error.message);
				toast.error(error.message);
			}
		}
	};

	const getCartCount = () => {
		let totalCount = 0;
		for (const items in cartItems) {
			for (const item in cartItems[items]) {
				try {
					// items is the id of the product
					// item is the size of the product
					if (cartItems[items][item] > 0) {
						totalCount += cartItems[items][item];
					}
				} catch (error) {
					console.log(error);
				}
			}
		}
		return totalCount;
	};

	const updateQuantity = async (itemId, size, quantity) => {
		let cartDataCopy = structuredClone(cartItems);
		cartDataCopy[itemId][size] = quantity;
		console.log(cartDataCopy);
		setCartItems(cartDataCopy);

		if (token) {
			try {
				await axios.post(
					backendUrl + "/cart/update",
					{
						itemId,
						size,
						quantity,
					},
					{ headers: { token } }
				);
			} catch (error) {
				console.log(error.message);
				toast.error(error.message);
			}
		}
	};

	const getCartAmount = () => {
		let totalAmount = 0;
		for (const items in cartItems) {
			let itemInfo = products.find((prod) => prod._id === items);
			for (const item in cartItems[items]) {
				try {
					if (cartItems[items][item] > 0) {
						totalAmount +=
							itemInfo.price * cartItems[items][item]; // price*quantity
					}
				} catch (error) {
					console.log(error);
				}
			}
		}
		return totalAmount;
	};

	const getProducts = async () => {
		try {
			const response = await axios.get(backendUrl + "/product/list");
			// console.log(response.data.products)
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

	const getUserCart = async (token) => {
		try {
			const response = await axios.post(
				backendUrl + "/cart/get",
				{},
				{
					headers: { token },
				}
			);
			// console.log(response);
			if (response.data.success) {
				setCartItems(response.data.cartData);
			} else {
				toast.error(response.data.message);
			}
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	};

	useEffect(() => {
		getProducts();
	}, []);

	useEffect(() => {
		if (!token && localStorage.getItem("token")) {
			setToken(localStorage.getItem("token"));
			getUserCart(localStorage.getItem("token"));
		}
	}, []);

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
	};

	return (
		<ShopDataContext.Provider value={value}>
			{children}
		</ShopDataContext.Provider>
	);
};

export default ShopContext;
