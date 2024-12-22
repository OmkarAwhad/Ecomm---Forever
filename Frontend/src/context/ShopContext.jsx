/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom'

export const ShopDataContext = createContext();

const ShopContext = ({ children }) => {
	const currency = "$";
	const delivery_fee = 10;
	const [search, setSearch] = useState("");
	const [showSearch, setShowSearch] = useState(false);
	const [cartItems, setCartItems] = useState({});
	const navigate = useNavigate()

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
	};

	const getCartAmount =  () => {
		let totalAmount = 0;
		for(const items in cartItems){
			let itemInfo = products.find((prod) => prod._id === items);
			for(const item in cartItems[items]){
				try {
					if (cartItems[items][item] > 0) {
						totalAmount += itemInfo.price * cartItems[items][item]; // price*quantity
					}
				} catch (error) {
					console.log(error)
				}
			}
		}
		return totalAmount
	}

	const value = {
		products,
		currency,
		delivery_fee,
		search,
		setSearch,
		showSearch,
		setShowSearch,
		cartItems,
		addToCart,
		getCartCount,
		updateQuantity,
		getCartAmount,
		navigate
	};

	return (
		<ShopDataContext.Provider value={value}>
			{children}
		</ShopDataContext.Provider>
	);
};

export default ShopContext;
