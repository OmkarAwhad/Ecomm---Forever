/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

function Orders({ token }) {
	const [order, setOrders] = useState([]);

	const fetchAllOrders = async () => {
		try {
			if (!token) {
				return null;
			}
			const response = await axios.post(
				backendUrl + "/order/list",
				{},
				{ headers: { token } }
			);
			// console.log(response.data.response);
			if (response.data.success) {
				setOrders(response.data.response);
			} else {
				toast.error(response.data.message);
			}
		} catch (error) {
			console.log(error.message);
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
				{ headers: { token } }
			);

         if (response.data.success) {
				// means status has been updated
            await fetchAllOrders()
			} else {
				toast.error(response.data.message);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<h3>Order page</h3>
			<div>
				{order.map((item, index) => (
					<div
						className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700 "
						key={index}
					>
						<img
							className="w-12"
							src={assets.parcel_icon}
							alt=""
						/>

						<div>
							<div>
								{item.items.map((elm, id) => {
									if (id === item.items.length - 1) {
										return (
											<p
												className=" py-0.5 "
												key={id}
											>
												{elm.name} x{" "}
												{elm.quantity}{" "}
												<span>
													{elm.size}
												</span>{" "}
											</p>
										);
									} else {
										return (
											<p
												className=" py-0.5 "
												key={id}
											>
												{elm.name} x{" "}
												{elm.quantity}{" "}
												<span>
													{elm.size}
												</span>{" "}
												,{" "}
											</p>
										);
									}
								})}
							</div>
							<p className="mt-3 mb-2 font-medium">
								{item.address.firstName +
									" " +
									item.address.lastName}
							</p>
							<div>
								<p>{item.address.street + ", "}</p>
								<p>
									{item.address.city +
										", " +
										item.address.state +
										", " +
										item.address.country +
										", " +
										item.address.zipcode}
								</p>
							</div>
							<p>{item.address.phone}</p>
						</div>

						<div>
							<p className="text-sm sm:text-[15px] ">
								Items : {item.items.length}
							</p>
							<p className="mt-3 ">
								Method : {item.paymentMethod}{" "}
							</p>
							<p>
								Payment :{" "}
								{item.payment ? "Done" : "Pending"}{" "}
							</p>
							<p>
								Date :{" "}
								{new Date(
									item.date
								).toLocaleDateString()}{" "}
							</p>
						</div>

						<p className="text-sm sm:text-[15px]">
							{currency}
							{item.amount}
						</p>

						<select
							value={item.status}
							onChange={(e) =>
								handleStatusChange(e, item._id)
							}
							className="p-2 font-semibold"
						>
							<option value="Order Placed">
								Order Placed
							</option>
							<option value="Packing">Packing</option>
							<option value="Shipped">Shipped</option>
							<option value="Out for delivery">
								Out for delivery
							</option>
							<option value="Delivered">Delivered</option>
						</select>
					</div>
				))}
			</div>
		</div>
	);
}

export default Orders;
