/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import { products } from "../assets/frontend_assets/assets";

export const ShopDataContext = createContext();

const ShopContext = ({ children }) => {
	const currency = "$";
	const delivery_fee = 10;
	const [search, setSearch] = useState("");
	const [showSearch, setShowSearch] = useState(false);

	const value = {
		products,
		currency,
		delivery_fee,
		search,
		setSearch,
		showSearch,
		setShowSearch,
	};

	return (
		<ShopDataContext.Provider value={value}>
			{children}
		</ShopDataContext.Provider>
	);
};

export default ShopContext;
