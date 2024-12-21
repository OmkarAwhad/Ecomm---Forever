/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { createContext } from "react";
import { products } from "../assets/frontend_assets/assets";

export const ShopDataContext = createContext();

const ShopContext = ({ children }) => {
	const currency = "$";
	const delivery_fee = 10;

	const value = {
		products,
		currency,
		delivery_fee,
	};

	return (
		<ShopDataContext.Provider value={value}>
			{children}
		</ShopDataContext.Provider>
	);
};

export default ShopContext;
