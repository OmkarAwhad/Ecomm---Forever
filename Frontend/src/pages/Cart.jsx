import React, { useContext, useEffect } from "react";
import Title from "../components/endUser/Title";
import { ShopDataContext } from "../context/ShopContext";
import ProductInCart from "../components/endUser/ProductInCart";
import CartTotal from "../components/endUser/CartTotal";
import { BsCart } from "react-icons/bs";

function Cart() {
	const { cartItems, navigate, getUserCart, token } =
		useContext(ShopDataContext);

	useEffect(() => {
		if (token) {
			getUserCart();
		}
	}, [token]);

	return (
		<div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
			{cartItems.length > 0 ? (
				<>
					<div className="text-center md:text-left mb-8">
						<Title first={"YOUR"} second={"CART"} />
						<hr className="mt-2 border-gray-300" />
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{/* Cart Items */}
						<div className="lg:col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
							<div className="max-h-[60vh] overflow-y-auto divide-y divide-gray-200">
								{cartItems.map((item, index) => {
									return (
										<ProductInCart
											key={index}
											prodData={item.product} // Assuming populated
											cartData={item}
										/>
									);
								})}
							</div>
						</div>

						{/* Cart Summary */}
						<div className="lg:sticky lg:top-24 self-start bg-white rounded-lg shadow-md p-6">
							<h2 className="text-xl font-semibold mb-4">
								Order Summary
							</h2>
							<CartTotal />
							<button
								onClick={() => navigate("/place-order")}
								className="w-full mt-6 px-4 py-3 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors"
								aria-label="Proceed to checkout"
							>
								PROCEED TO CHECKOUT
							</button>
						</div>
					</div>
				</>
			) : (
				<div className="min-h-[60vh] flex flex-col items-center justify-center text-center gap-6">
					<BsCart className="text-6xl text-gray-400" />
					<p className="text-2xl font-semibold text-gray-600">
						YOUR CART IS EMPTY
					</p>
					<p className="text-sm text-gray-500 max-w-md">
						Looks like you haven't added anything to your cart
						yet. Start shopping to fill it up!
					</p>
					<button
						onClick={() => navigate("/collection")}
						className="px-6 py-3 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors"
					>
						Continue Shopping
					</button>
				</div>
			)}
		</div>
	);
}

export default Cart;
