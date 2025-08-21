import React, { useContext, useState, useEffect } from "react";
import Title from "../components/endUser/Title";
import CartTotal from "../components/endUser/CartTotal";
import { assets } from "../assets/frontend_assets/assets";
import { ShopDataContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

function PlaceOrder() {
	const [method, setMethod] = useState("cod");
	const [addresses, setAddresses] = useState([]);
	const [selectedAddress, setSelectedAddress] = useState(null);
	const [showAddForm, setShowAddForm] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const {
		navigate,
		backendUrl,
		token,
		cartItems,
		setCartItems,
		getCartAmount,
		delivery_fee,
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
		label: "Home",
		isDefault: false,
	});

	// Fetch user addresses
	const fetchAddresses = async () => {
		try {
			setIsLoading(true);
			const response = await axios.post(
				backendUrl + "/address/list",
				{},
				{ headers: { token } }
			);
			if (response.data.success) {
				setAddresses(response.data.response);
				// Auto-select default address if available
				const defaultAddr = response.data.response.find(
					(addr) => addr.isDefault
				);
				if (defaultAddr) {
					setSelectedAddress(defaultAddr._id);
				}
			}
		} catch (error) {
			console.log(error);
			toast.error("Failed to fetch addresses");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchAddresses();
	}, []);

	// Add new address
	const addNewAddress = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				backendUrl + "/address/add",
				formData,
				{ headers: { token } }
			);
			if (response.data.success) {
				toast.success("Address added successfully");
				setFormData({
					firstName: "",
					lastName: "",
					email: "",
					street: "",
					city: "",
					state: "",
					zipcode: "",
					country: "",
					phone: "",
					label: "Home",
					isDefault: false,
				});
				setShowAddForm(false);
				fetchAddresses();
			}
		} catch (error) {
			console.log(error);
			toast.error("Failed to add address");
		}
	};

	const initPay = (order) => {
		const options = {
			key: import.meta.env.VITE_RAZORPAY_KEY_ID,
			amount: order.amount,
			currency: order.currency,
			name: "Order Payment",
			description: "Order Payment",
			order_id: order.id,
			receipt: order.receipt,
			handler: async (resp) => {
				console.log(resp);
				try {
					const response = await axios.post(
						backendUrl + "/order/verifyRazorpay",
						resp,
						{ headers: { token } }
					);
					if (response.data.success) {
						navigate("/orders");
						setCartItems([]);
					}
				} catch (error) {
					console.log(error);
					toast.error(error.message);
				}
			},
		};
		const rzp = new window.Razorpay(options);
		rzp.open();
	};

	const submitHandler = async (e) => {
		e.preventDefault();

		if (!selectedAddress) {
			toast.error("Please select a delivery address");
			return;
		}

		try {
			let orderItems = cartItems.map((item) => ({
				product: item.product._id,
				size: item.size,
				quantity: item.quantity,
				name: item.product.name,
				price: item.product.price,
			}));

			let orderData = {
				addressId: selectedAddress,
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
						setCartItems([]);
						navigate("/orders");
						toast.success("Order placed successfully");
					} else {
						toast.error(response.data.message);
					}
					break;

				case "stripe":
					const responseStripe = await axios.post(
						backendUrl + "/order/stripe",
						orderData,
						{ headers: { token } }
					);
					if (responseStripe.data.success) {
						const { session } = responseStripe.data;
						if (typeof session === "string") {
							window.location.replace(session);
						} else if (session.url) {
							window.location.replace(session.url);
						} else {
							toast.error("Invalid session URL");
						}
					} else {
						toast.error(responseStripe.data.message);
					}
					break;

				case "razorpay":
					const responseRazorpay = await axios.post(
						backendUrl + "/order/razorpay",
						orderData,
						{ headers: { token } }
					);
					if (responseRazorpay.data.success) {
						initPay(responseRazorpay.data.order);
					}
					break;
				default:
					break;
			}
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	};

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-64">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
			</div>
		);
	}

	return (
		<div className="min-h-screen py-10 flex lg:flex-row flex-col justify-between gap-8">
			<div className="w-full lg:w-[55%]">
				{/* Address Selection Section */}
				<div className="mb-8">
					<div className="text-2xl mb-5">
						<Title first={"DELIVERY"} second={"ADDRESS"} />
					</div>

					{/* Existing Addresses */}
					<div className="space-y-3 mb-4">
						{addresses.map((address) => (
							<div
								key={address._id}
								className={`border-2 p-4 cursor-pointer transition-colors ${
									selectedAddress === address._id
										? "border-black bg-gray-50"
										: "border-gray-200 hover:border-gray-400"
								}`}
								onClick={() =>
									setSelectedAddress(address._id)
								}
							>
								<div className="flex items-start justify-between">
									<div className="flex items-start space-x-3">
										<div
											className={`w-4 h-4 rounded-full border-2 mt-1 ${
												selectedAddress ===
												address._id
													? "bg-black border-black"
													: "border-gray-400"
											}`}
										></div>
										<div>
											<div className="flex items-center space-x-2">
												<h3 className="font-semibold">
													{
														address.firstName
													}{" "}
													{
														address.lastName
													}
												</h3>
												<span className="bg-gray-200 px-2 py-1 text-xs rounded">
													{address.label}
												</span>
												{address.isDefault && (
													<span className="bg-black text-white px-2 py-1 text-xs rounded">
														Default
													</span>
												)}
											</div>
											<p className="text-sm text-gray-600 mt-1">
												{address.street},{" "}
												{address.city},{" "}
												{address.state} -{" "}
												{address.zipcode}
											</p>
											<p className="text-sm text-gray-600">
												{address.country} |{" "}
												{address.phone}
											</p>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* Add New Address Button */}
					<button
						type="button"
						onClick={() => setShowAddForm(!showAddForm)}
						className="w-full border-2 border-dashed border-gray-300 p-4 text-center hover:border-gray-400 transition-colors"
					>
						+ Add New Address
					</button>

					{/* Add New Address Form */}
					{showAddForm && (
						<form
							onSubmit={addNewAddress}
							className="mt-4 p-4 border border-gray-200 bg-gray-50"
						>
							<h3 className="font-semibold mb-4">
								Add New Address
							</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<input
									required
									className="border px-3 py-2 outline-none"
									type="text"
									placeholder="First name"
									value={formData.firstName}
									onChange={(e) =>
										setFormData({
											...formData,
											firstName:
												e.target.value,
										})
									}
								/>
								<input
									required
									className="border px-3 py-2 outline-none"
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
								<input
									required
									className="border px-3 py-2 outline-none md:col-span-2"
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
									required
									className="border px-3 py-2 outline-none md:col-span-2"
									type="text"
									placeholder="Street address"
									value={formData.street}
									onChange={(e) =>
										setFormData({
											...formData,
											street: e.target.value,
										})
									}
								/>
								<input
									required
									className="border px-3 py-2 outline-none"
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
									required
									className="border px-3 py-2 outline-none"
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
								<input
									required
									className="border px-3 py-2 outline-none"
									type="text"
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
									required
									className="border px-3 py-2 outline-none"
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
								<input
									required
									className="border px-3 py-2 outline-none"
									type="tel"
									placeholder="Phone"
									value={formData.phone}
									onChange={(e) =>
										setFormData({
											...formData,
											phone: e.target.value,
										})
									}
								/>
								<select
									className="border px-3 py-2 outline-none"
									value={formData.label}
									onChange={(e) =>
										setFormData({
											...formData,
											label: e.target.value,
										})
									}
								>
									<option value="Home">Home</option>
									<option value="Work">Work</option>
									<option value="Other">
										Other
									</option>
								</select>
							</div>
							<div className="flex items-center mt-4">
								<input
									type="checkbox"
									id="isDefault"
									checked={formData.isDefault}
									onChange={(e) =>
										setFormData({
											...formData,
											isDefault:
												e.target.checked,
										})
									}
									className="mr-2"
								/>
								<label
									htmlFor="isDefault"
									className="text-sm"
								>
									Set as default address
								</label>
							</div>
							<div className="flex space-x-3 mt-4">
								<button
									type="submit"
									className="bg-black text-white px-6 py-2 text-sm"
								>
									Save Address
								</button>
								<button
									type="button"
									onClick={() =>
										setShowAddForm(false)
									}
									className="border border-gray-400 px-6 py-2 text-sm"
								>
									Cancel
								</button>
							</div>
						</form>
					)}
				</div>
			</div>

			<div className="w-full lg:w-[40%]">
				<CartTotal />
				<div className="mt-10">
					<div className="text-lg mb-5">
						<Title first={"PAYMENT"} second={"METHOD"} />
					</div>
					<div className="flex flex-col lg:flex-row gap-3">
						<div
							onClick={() => setMethod("stripe")}
							className="flex items-center gap-3 w-full lg:w-[32%] justify-start border p-2 px-3 cursor-pointer"
						>
							<p
								className={`min-w-3.5 h-3.5 border-2 border-gray-400 rounded-full ${
									method === "stripe"
										? "bg-green-400 p-1 border-transparent"
										: ""
								}`}
							></p>
							<img
								src={assets.stripe_logo}
								className="h-5 mx-4"
								alt=""
							/>
						</div>
						<div
							onClick={() => setMethod("razorpay")}
							className="flex items-center gap-3 w-full lg:w-[32%] justify-start border p-2 px-3 cursor-pointer"
						>
							<p
								className={`min-w-3.5 h-3.5 border-2 border-gray-400 rounded-full ${
									method === "razorpay"
										? "bg-green-400 p-1 border-transparent"
										: ""
								}`}
							></p>
							<img
								src={assets.razorpay_logo}
								className="h-5 mx-4"
								alt=""
							/>
						</div>
						<div
							onClick={() => setMethod("cod")}
							className="flex items-center gap-3 w-full lg:w-[32%] justify-start border p-2 px-3 cursor-pointer"
						>
							<p
								className={`min-w-3.5 h-3.5 border-2 border-gray-400 rounded-full ${
									method === "cod"
										? "bg-green-400 p-1 border-transparent"
										: ""
								}`}
							></p>
							<p className="text-gray-500 text-sm font-medium mx-4">
								CASH ON DELIVERY
							</p>
						</div>
					</div>
					<div className="flex w-full items-end justify-end my-7">
						<button
							onClick={submitHandler}
							disabled={!selectedAddress}
							className={`px-10 py-2 text-sm ${
								selectedAddress
									? "bg-black text-white cursor-pointer"
									: "bg-gray-300 text-gray-500 cursor-not-allowed"
							}`}
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
