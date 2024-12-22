/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from "react";
import Title from "./Title";
import { ShopDataContext } from "../context/ShopContext";

function CartTotal() {
	const { currency, delivery_fee, getCartAmount } =
		useContext(ShopDataContext);

	return (
		<div className="w-full flex flex-col ">
			<div className="text-2xl">
				<Title first={"CART"} second={"TOTALS"} />
			</div>
			<div className="text-sm text-gray-600">
				<div className="flex justify-between my-2 ">
					<p>Subtotal</p>
					<p>
						{currency}
						{getCartAmount()}.00
					</p>
				</div>
				<hr />
				<div className="flex justify-between  my-2">
					<p>Shipping Fee</p>
					<p>
						{currency}
						{delivery_fee}.00
					</p>
				</div>
				<hr />
				<div className="flex justify-between text-gray-700 font-medium my-2">
					<p>Total</p>
					<p>
						{currency}
						{getCartAmount() === 0
							? 0
							: getCartAmount() + delivery_fee}
						.00
					</p>
				</div>
			</div>
		</div>
	);
}

export default CartTotal;
