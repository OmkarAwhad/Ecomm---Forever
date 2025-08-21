import React, { useContext } from "react";
import { ShopDataContext } from "../../context/ShopContext";
import { assets } from "../../assets/frontend_assets/assets";

function ProductInCart({ prodData, cartData }) {
	const { currency, updateQuantity } = useContext(ShopDataContext);

	// Handlers ---------------------------------------------------------------
	const incQty = () => updateQuantity(cartData._id, cartData.quantity + 1);
	const decQty = () =>
		cartData.quantity > 1 &&
		updateQuantity(cartData._id, cartData.quantity - 1);

	return (
		<div className="py-4 w-[90%] mx-auto border-t border-b text-gray-700 grid grid-cols-[4fr_1fr_0.5fr] sm:grid-cols-[4fr_1fr_0.5fr] items-center gap-4">
			<div className="flex items-start gap-10">
				<img
					src={prodData.images[0]}
					alt="product"
					className="w-16 sm:w-20 object-cover"
				/>
				<div>
					<p className="font-medium text-xs sm:text-lg">
						{prodData.name}
					</p>
					<div className="flex gap-6 mt-3 items-center">
						<p className="text-gray-500">
							{currency}
							{prodData.price}
						</p>
						<p className="px-3 py-1 border bg-gray-100">
							{cartData.size}
						</p>
					</div>
				</div>
			</div>

			<div className="flex items-center justify-center gap-3">
				<button
					onClick={decQty}
					className="h-7 w-7 flex items-center justify-center border rounded hover:bg-gray-200"
					aria-label="Decrease quantity"
				>
					–
				</button>

				<span className="min-w-[2rem] text-center select-none">
					{cartData.quantity}
				</span>

				<button
					onClick={incQty}
					className="h-7 w-7 flex items-center justify-center border rounded hover:bg-gray-200"
					aria-label="Increase quantity"
				>
					+
				</button>
			</div>

			<div className="flex justify-end">
				<img
					src={assets.bin_icon}
					alt="remove item"
					onClick={() => updateQuantity(cartData._id, 0)}
					className="w-4 sm:w-5 cursor-pointer"
				/>
			</div>
		</div>
	);
}

export default ProductInCart;
