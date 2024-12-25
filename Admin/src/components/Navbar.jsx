/* eslint-disable no-unused-vars */
import React from "react";
import { assets } from "../assets/assets";

function Navbar() {
	return (
		<>
			<div className="flex mx-4 md:mx-10 my-2 items-center justify-between ">
				<img src={assets.logo} alt="" className="sm:h-16 h-8 " />
				<button className="bg-gray-600 font-medium px-4 sm:px-7 py-2 text-xs sm:text-sm text-white rounded-full ">
					Logout
				</button>
			</div>
			<hr />
		</>
	);
}

export default Navbar;
