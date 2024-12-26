/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { ShopDataContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";

function ProductInCart({ prodData, cartData }) {
	const { currency, updateQuantity } = useContext(ShopDataContext);

	return (
		<div className="py-4 w-full  border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.2fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 justify-between ">
			<div className="flex items-start gap-10 ">
				<img
					src={prodData.images[0]}
					alt="Prod_image"
					className=" h-20 sm:w-20  "
				/>
				<div className="flex flex-col gap-2">
					<p className="font-medium text-xs sm:text-lg ">
						{prodData.name}
					</p>
					<div className="flex flex-col sm:flex-row items-start gap-1 sm:gap-10 text-xs sm:text-sm sm:items-center ">
						<p className="text-gray-500">
							{currency}
							{prodData.price}
						</p>
                  <p>
                     {/* Quantity:{prodData.quantity} */}
                     Quantity: 1
                  </p>
						<p >
							{/* Size:{prodData.size} */}
							Size: M
						</p>
					</div>
               <p className=" text-xs sm:text-sm text-gray-600">Date: 25, May, 2024</p>
				</div>
			</div>
			<div className="flex items-center gap-2 ">
            <p className=" h-1 w-2 sm:h-2 sm:w-2 rounded-full bg-green-500"></p>
            <p className="text-xs sm:text-sm">Ready to Ship</p>
         </div>
         <button className="px-3 py-2 border text-xs sm:text-sm sm:w-[150%]">Track Order</button>
		</div>
	);
}

export default ProductInCart;
