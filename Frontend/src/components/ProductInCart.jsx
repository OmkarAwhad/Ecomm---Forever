/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { ShopDataContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";

function ProductInCart({ prodData, cartData }) {
	const { currency, updateQuantity } = useContext(ShopDataContext);

	return (
		<div className="py-4 w-full border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 justify-between ">
			<div className="flex items-start gap-10 ">
				<img
					src={prodData.images[0]}
					alt="Prod_image"
					className=" w-16 sm:w-20 "
				/>
				<div>
					<p className="font-medium text-xs sm:text-lg ">
						{prodData.name}
					</p>
					<div className="flex gap-10 mt-3 items-center ">
						<p className="text-gray-500">
							{currency}
							{prodData.price}
						</p>
						<p className="px-3 py-1 border bg-gray-100 ">
							{cartData.size}
						</p>
					</div>
				</div>
			</div>
			<input
				type="number"
				min={1}
				defaultValue={cartData.quantity}
				onChange={(e) =>
					e.target.value === "" || e.target.value === "0"
						? null
						: updateQuantity(
								cartData._id,
								cartData.size,
								Number(e.target.value)
						   )
				}
				className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 "
			/>
			<div>
				<img
					src={assets.bin_icon}
					alt="Bin_Icon"
					onClick={() =>
						updateQuantity(cartData._id, cartData.size, 0)
					}
					className=" w-4 sm:w-5 cursor-pointer "
				/>
			</div>
		</div>
	);
}

export default ProductInCart;
