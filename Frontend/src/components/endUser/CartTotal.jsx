import React, { useContext } from "react";
import Title from "./Title";
import { ShopDataContext } from "../../context/ShopContext";

function CartTotal() {
	const { currency, delivery_fee, getCartAmount } =
		useContext(ShopDataContext);

	const subtotal = getCartAmount();
	const total = subtotal === 0 ? 0 : subtotal + delivery_fee;

	return (
		<div className="w-full bg-white rounded-lg shadow-md p-6">
			<div className="text-xl font-semibold mb-4">
				<Title first={"CART"} second={"TOTALS"} />
			</div>
			<div className="text-sm text-gray-700 space-y-3">
				<div className="flex justify-between">
					<p>Subtotal</p>
					<p className="font-medium">
						{currency}
						{subtotal}.00
					</p>
				</div>
				<hr className="border-gray-200" />
				<div className="flex justify-between">
					<p>Shipping Fee</p>
					<p className="font-medium">
						{currency}
						{delivery_fee}.00
					</p>
				</div>
				<hr className="border-gray-200" />
				<div className="flex justify-between text-base font-semibold text-gray-900">
					<p>Total</p>
					<p>
						{currency}
						{total}.00
					</p>
				</div>
			</div>
		</div>
	);
}

export default CartTotal;
