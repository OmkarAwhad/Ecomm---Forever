/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/frontend_assets/assets";
import { ShopDataContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

function PlaceOrder() {
	const [method, setMethod] = useState("cod");
	const {
		navigate,
		backendUrl,
		token,
		cartItems,
		setCartItems,
		getCartAmount,
		delivery_fee,
		products,
	} = useContext(ShopDataContext);

	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		street: "",
		city: "",
		state: "",
		zipcode: "",
		country: "",
		phone: "",
	});

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			let orderItems = [];

			for (const items in cartItems) {
				for (const item in cartItems[items]) {
					if (cartItems[items][item] > 0) {
						const itemInfo = structuredClone(
							products.find((prod) => prod._id === items)
						);
						if (itemInfo) {
							itemInfo.size = item;
							itemInfo.quantity = cartItems[items][item];
							orderItems.push(itemInfo);
						}
					}
				}
			}

			let orderData = {
				address: formData,
				items: orderItems,
				amount: getCartAmount() + delivery_fee,
			};

			switch (method) {
				case "cod":
					const response = await axios.post(
						backendUrl + "/order/place",
						orderData,
						{ headers: { token } }
					);
					if (response.data.success) {
						setCartItems({});
						navigate("/orders");
					} else {
						toast.error(response.data.message);
					}
					break;
				default:
					break;
			}
		} catch (error) {
			console.log(error)
			toast.error(error.message);
		}
	};

	return (
		<form
			onSubmit={submitHandler}
			className="h-screen py-10 flex lg:flex-row flex-col justify-between "
		>
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
							value={formData.firstName}
							onChange={(e) =>
								setFormData({
									...formData,
									firstName: e.target.value,
								})
							}
						/>
						<input
							className="border-2 w-full px-3 py-1 outline-none "
							type="text"
							placeholder="Last name"
							value={formData.lastName}
							onChange={(e) =>
								setFormData({
									...formData,
									lastName: e.target.value,
								})
							}
						/>
					</div>
					<input
						className="border-2 w-full px-3 py-1 outline-none "
						type="email"
						placeholder="Email address"
						value={formData.email}
						onChange={(e) =>
							setFormData({
								...formData,
								email: e.target.value,
							})
						}
					/>
					<input
						className="border-2 w-full px-3 py-1 outline-none "
						type="text"
						placeholder="Street"
						value={formData.street}
						onChange={(e) =>
							setFormData({
								...formData,
								street: e.target.value,
							})
						}
					/>
					<div className="flex w-full justify-between gap-3 ">
						<input
							className="border-2 w-full px-3 py-1 outline-none "
							type="text"
							placeholder="City"
							value={formData.city}
							onChange={(e) =>
								setFormData({
									...formData,
									city: e.target.value,
								})
							}
						/>
						<input
							className="border-2 w-full px-3 py-1 outline-none "
							type="text"
							placeholder="State"
							value={formData.state}
							onChange={(e) =>
								setFormData({
									...formData,
									state: e.target.value,
								})
							}
						/>
					</div>
					<div className="flex w-full justify-between gap-3 ">
						<input
							className="border-2 w-full px-3 py-1 outline-none "
							type="number"
							placeholder="Zip code"
							value={formData.zipcode}
							onChange={(e) =>
								setFormData({
									...formData,
									zipcode: e.target.value,
								})
							}
						/>
						<input
							className="border-2 w-full px-3 py-1 outline-none "
							type="text"
							placeholder="Country"
							value={formData.country}
							onChange={(e) =>
								setFormData({
									...formData,
									country: e.target.value,
								})
							}
						/>
					</div>
					<input
						className="border-2 w-full px-3 py-1 outline-none "
						type="number"
						placeholder="Phone"
						value={formData.phone}
						onChange={(e) =>
							setFormData({
								...formData,
								phone: e.target.value,
							})
						}
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
							type="submit"
							onClick={() => navigate("/orders")}
							className="bg-black text-white px-10 py-2 text-sm "
						>
							PLACE ORDER
						</button>
					</div>
				</div>
			</div>
		</form>
	);
}

export default PlaceOrder;
