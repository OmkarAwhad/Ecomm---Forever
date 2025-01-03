/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { ShopDataContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import { useLocation } from "react-router-dom";

function SearchBar() {
	const { search, setSearch, showSearch, setShowSearch } =
		useContext(ShopDataContext);

	const [visible, setVisible] = useState(false);

	const location = useLocation();
	useEffect(() => {
		if (location.pathname.includes("/collection")) {
			setVisible(true);
		} else {
			setVisible(false);
		}
	}, [location]);

	return showSearch && visible ? (
		<div className="border-t border-b bg-gray-50 text-center ">
			<div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 ">
				<input
					type="text"
					value={search}
					placeholder="Search"
					onChange={(e) => setSearch(e.target.value)}
					className="flex-1 outline-none bg-transparent"
				/>
				<img src={assets.search_icon} className="w-4" alt="" />
			</div>
			<img
				src={assets.cross_icon}
				onClick={() => setShowSearch(false)}
				alt="Cross_Icon"
				className="inline w-3 cursor-pointer"
			/>
		</div>
	) : null;
}

export default SearchBar;
