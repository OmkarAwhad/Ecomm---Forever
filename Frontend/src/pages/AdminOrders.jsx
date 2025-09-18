import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ShopDataContext } from "../context/ShopContext";
import { assets } from "../assets/admin_assets/assets";

function AdminOrders() {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const { backendUrl, currency, token } = useContext(ShopDataContext);

	const fetchAllOrders = async () => {
		try {
			setLoading(true);
			if (!token) {
				return null;
			}

			const response = await axios.get(backendUrl + "/order/list", {
				headers: { Authorization: `Bearer ${token}` },
			});

			if (response.data.success) {
				setOrders(response.data.response);
			} else {
				toast.error(response.data.message);
			}
		} catch (error) {
			console.log(error.message);
			toast.error("Failed to fetch orders");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchAllOrders();
	}, [token]);

	const handleStatusChange = async (e, orderId) => {
		try {
			const response = await axios.post(
				backendUrl + "/order/status",
				{ orderId, status: e.target.value },
				{ headers: { Authorization: `Bearer ${token}` } }
			);

			if (response.data.success) {
				await fetchAllOrders();
				toast.success("Order status updated successfully");
			} else {
				toast.error(response.data.message);
			}
		} catch (error) {
			console.log(error);
			toast.error("Failed to update order status");
		}
	};

	const getStatusColor = (status) => {
		const statusColors = {
			"Order Placed": "bg-blue-50 text-blue-700 border-blue-200",
			Packing: "bg-yellow-50 text-yellow-700 border-yellow-200",
			Shipped: "bg-purple-50 text-purple-700 border-purple-200",
			"Out for delivery":
				"bg-orange-50 text-orange-700 border-orange-200",
			Delivered: "bg-green-50 text-green-700 border-green-200",
		};
		return (
			statusColors[status] ||
			"bg-gray-50 text-gray-700 border-gray-200"
		);
	};

	if (loading) {
		return (
			<div className="bg-white rounded-lg shadow-sm p-6 text-center">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c486a5] mx-auto"></div>
				<p className="mt-4 text-gray-600">Loading orders...</p>
			</div>
		);
	}

	return (
		<div className="bg-white rounded-lg shadow-sm p-6 border">
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
				<h2 className="text-2xl font-bold text-gray-800 mb-2 sm:mb-0">
					Orders Management
				</h2>
				<div className="bg-gray-100 px-3 py-1 rounded-full">
					<span className="text-sm font-medium text-gray-700">
						Total Orders: {orders.length}
					</span>
				</div>
			</div>

			<div className="space-y-4">
				{orders.length > 0 ? (
					orders.map((order, index) => (
						<div
							key={order._id || index}
							className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow duration-200"
						>
							{/* Mobile Layout */}
							<div className="block lg:hidden space-y-4">
								<div className="flex items-start justify-between">
									<div className="flex items-start space-x-3">
										<img
											className="w-8 h-8 mt-1"
											src={assets.parcel_icon}
											alt="Order"
										/>
										<div>
											<h3 className="font-semibold text-gray-800">
												Order #{index + 1}
											</h3>
											<p className="text-sm text-gray-500">
												{new Date(
													order.date
												).toLocaleDateString()}
											</p>
										</div>
									</div>
									<span
										className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
											order.status
										)}`}
									>
										{order.status}
									</span>
								</div>

								<div className="space-y-3">
									<div>
										<h4 className="font-medium text-gray-800 mb-1">
											Customer
										</h4>
										<p className="text-sm text-gray-600">
											{order.address
												.firstName +
												" " +
												order.address
													.lastName}
										</p>
										<p className="text-sm text-gray-600">
											{order.address.phone}
										</p>
										<p className="text-sm text-gray-600">
											{order.address.street},{" "}
											{order.address.city}
										</p>
									</div>

									<div>
										<h4 className="font-medium text-gray-800 mb-1">
											Items
										</h4>
										<div className="text-sm text-gray-600">
											{order.items.map(
												(
													item,
													itemIndex
												) => (
													<p
														key={
															itemIndex
														}
													>
														{
															item.name
														}{" "}
														x{" "}
														{
															item.quantity
														}{" "}
														(
														{
															item.size
														}
														)
													</p>
												)
											)}
										</div>
									</div>

									<div className="flex justify-between items-center">
										<div>
											<p className="text-sm text-gray-600">
												Payment:{" "}
												<span
													className={
														order.payment
															? "text-green-600"
															: "text-red-600"
													}
												>
													{order.payment
														? "Done"
														: "Pending"}
												</span>
											</p>
											<p className="text-sm text-gray-600">
												Method:{" "}
												{
													order.paymentMethod
												}
											</p>
										</div>
										<p className="text-lg font-bold text-[#c486a5]">
											{currency}
											{order.amount}
										</p>
									</div>

									<select
										value={order.status}
										onChange={(e) =>
											handleStatusChange(
												e,
												order._id
											)
										}
										className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c486a5] focus:border-transparent"
									>
										<option value="Order Placed">
											Order Placed
										</option>
										<option value="Packing">
											Packing
										</option>
										<option value="Shipped">
											Shipped
										</option>
										<option value="Out for delivery">
											Out for delivery
										</option>
										<option value="Delivered">
											Delivered
										</option>
									</select>
								</div>
							</div>

							{/* Desktop Layout */}
							<div className="hidden lg:block">
								<div className="flex items-start justify-between mb-4">
									<div className="flex items-start space-x-4">
										<img
											className="w-10 h-10 mt-1"
											src={assets.parcel_icon}
											alt="Order"
										/>
										<div>
											<h3 className="text-lg font-semibold text-gray-800">
												Order #{index + 1}
											</h3>
											<p className="text-sm text-gray-500">
												{new Date(
													order.date
												).toLocaleDateString()}
											</p>
										</div>
									</div>
									<div className="flex items-center space-x-4">
										<span
											className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
												order.status
											)}`}
										>
											{order.status}
										</span>
										<p className="text-xl font-bold text-[#c486a5]">
											{currency}
											{order.amount}
										</p>
									</div>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
									<div>
										<h4 className="font-medium text-gray-800 mb-2">
											Customer Details
										</h4>
										<div className="text-sm text-gray-600 space-y-1">
											<p className="font-medium text-gray-800">
												{order.address
													.firstName +
													" " +
													order.address
														.lastName}
											</p>
											<p>
												{
													order.address
														.phone
												}
											</p>
											<p>
												{
													order.address
														.street
												}
											</p>
											<p>
												{order.address.city}
												,{" "}
												{
													order.address
														.state
												}
												,{" "}
												{
													order.address
														.country
												}
											</p>
										</div>
									</div>

									<div>
										<h4 className="font-medium text-gray-800 mb-2">
											Order Items
										</h4>
										<div className="text-sm text-gray-600 space-y-1">
											{order.items.map(
												(
													item,
													itemIndex
												) => (
													<p
														key={
															itemIndex
														}
													>
														{
															item.name
														}{" "}
														x{" "}
														{
															item.quantity
														}{" "}
														(
														{
															item.size
														}
														)
													</p>
												)
											)}
										</div>
									</div>

									<div className="space-y-3">
										<div>
											<h4 className="font-medium text-gray-800 mb-2">
												Payment Info
											</h4>
											<div className="text-sm text-gray-600 space-y-1">
												<p>
													Method:{" "}
													{
														order.paymentMethod
													}
												</p>
												<p>
													Status:{" "}
													<span
														className={
															order.payment
																? "text-green-600"
																: "text-red-600"
														}
													>
														{order.payment
															? "Done"
															: "Pending"}
													</span>
												</p>
											</div>
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">
												Update Status
											</label>
											<select
												value={order.status}
												onChange={(e) =>
													handleStatusChange(
														e,
														order._id
													)
												}
												className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c486a5] focus:border-transparent"
											>
												<option value="Order Placed">
													Order Placed
												</option>
												<option value="Packing">
													Packing
												</option>
												<option value="Shipped">
													Shipped
												</option>
												<option value="Out for delivery">
													Out for
													delivery
												</option>
												<option value="Delivered">
													Delivered
												</option>
											</select>
										</div>
									</div>
								</div>
							</div>
						</div>
					))
				) : (
					<div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
						<div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
							<svg
								className="w-8 h-8 text-gray-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
								/>
							</svg>
						</div>
						<h3 className="text-lg font-medium text-gray-800 mb-2">
							No orders found
						</h3>
						<p className="text-gray-600">
							Orders will appear here once customers start
							placing them.
						</p>
					</div>
				)}
			</div>
		</div>
	);
}

export default AdminOrders;
