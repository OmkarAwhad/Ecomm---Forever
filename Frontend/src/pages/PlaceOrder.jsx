/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/frontend_assets/assets";
import { ShopDataContext } from "../context/ShopContext";

function PlaceOrder() {
	const [method, setMethod] = useState("cod");
	const { navigate } = useContext(ShopDataContext);

	return (
		<div className="h-screen py-10 flex lg:flex-row flex-col justify-between ">
			<div className="w-full lg:w-[45%]">
				<div className="text-2xl mb-5">
					<Title first={"DELIVERY"} second={"INFORMATION"} />
				</div>
				<form className="flex flex-col gap-5">
					<div className="flex w-full justify-between gap-3 ">
						<input
							className="border-2 w-full px-3 py-1 outline-none "
							type="text"
							placeholder="First name"
						/>
						<input
							className="border-2 w-full px-3 py-1 outline-none "
							type="text"
							placeholder="Last name"
						/>
					</div>
					<input
						className="border-2 w-full px-3 py-1 outline-none "
						type="email"
						placeholder="Email address"
						name=""
						id=""
					/>
					<input
						className="border-2 w-full px-3 py-1 outline-none "
						type="text"
						placeholder="Street"
					/>
					<div className="flex w-full justify-between gap-3 ">
						<input
							className="border-2 w-full px-3 py-1 outline-none "
							type="text"
							placeholder="City"
						/>
						<input
							className="border-2 w-full px-3 py-1 outline-none "
							type="text"
							placeholder="State"
						/>
					</div>
					<div className="flex w-full justify-between gap-3 ">
						<input
							className="border-2 w-full px-3 py-1 outline-none "
							type="number"
							placeholder="Zip code   "
						/>
						<input
							className="border-2 w-full px-3 py-1 outline-none "
							type="text"
							placeholder="Country"
						/>
					</div>
					<input
						className="border-2 w-full px-3 py-1 outline-none "
						type="number"
						placeholder="Phone"
					/>
				</form>
			</div>

			<div className=" w-full my-20 lg:w-[40%] lg:mt-5 ">
				<CartTotal />
				<div className="mt-10 ml-4">
					<div className="text-lg">
						<Title first={"PAYMENT"} second={"METHOD"} />
					</div>
					<div className="flex flex-col lg:flex-row gap-3">
						<div
							onClick={() => setMethod("stripe")}
							className="flex items-center gap-3 w-[50%] lg:w-[32%] justify-start border p-2 px-3 cursor-pointer "
						>
							<p
								className={`min-w-3.5 h-3.5 border-2 border-gray-400 rounded-full ${
									method === "stripe"
										? "bg-green-400 p-1 border-transparent"
										: ""
								} `}
							></p>
							<img
								src={assets.stripe_logo}
								className="h-5 mx-4"
								alt=""
							/>
						</div>
						<div
							onClick={() => setMethod("razorpay")}
							className="flex items-center gap-3 w-[50%] lg:w-[32%] justify-start border p-2 px-3 cursor-pointer "
						>
							<p
								className={`min-w-3.5 h-3.5 border-2 border-gray-400 rounded-full ${
									method === "razorpay"
										? "bg-green-400 p-1 border-transparent"
										: ""
								} `}
							></p>
							<img
								src={assets.razorpay_logo}
								className="h-5 mx-4"
								alt=""
							/>
						</div>
						<div
							onClick={() => setMethod("cod")}
							className="flex items-center gap-3 w-[50%] lg:w-[32%] justify-start border p-2 px-3 cursor-pointer "
						>
							<p
								className={`min-w-3.5 h-3.5 border-2 border-gray-400 rounded-full ${
									method === "cod"
										? "bg-green-400  p-1 border-transparent"
										: ""
								} `}
							></p>
							<p className="text-gray-500 text-sm font-medium mx-4 ">
								CASH ON DELIVERY
							</p>
						</div>
					</div>
					<div className="flex w-full items-end justify-end my-7 ">
						<button
							onClick={() => navigate("/orders")}
							className="bg-black text-white px-10 py-2 text-sm "
						>
							PLACE ORDER
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PlaceOrder;
