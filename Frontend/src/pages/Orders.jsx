import React, { useContext, useEffect, useState } from "react";
import Title from "../components/endUser/Title";
import ProductInOrder from "../components/endUser/ProductInOrder";
import { ShopDataContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { HiOutlineShoppingBag } from "react-icons/hi2";

function Orders() {
	const { backendUrl, token, navigate } = useContext(ShopDataContext);

	const [orderData, setOrderData] = useState([]);
	const [loading, setLoading] = useState(true);

	const getOrderData = async () => {
		setLoading(true);
		try {
			if (!token) {
				return;
			}
			const response = await axios.post(
				`${backendUrl}/order/userorders`,
				null,
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			// console.log(response.data)
			if (response.data.success) {
				let allOrders = [];
				response.data.response.forEach((order) => {
					order.items.forEach((item) => {
						item.status = order.status;
						item.payment = order.payment;
						item.paymentMethod = order.paymentMethod;
						item.date = order.date;
						allOrders.push(item);
					});
				});
				setOrderData(allOrders.reverse());
				// console.log(allOrders.reverse())
			}
		} catch (error) {
			console.error(error);
			toast.error(error.message || "Failed to fetch orders");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getOrderData();
	}, [token]);

	return (
		<div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
			<div className="text-center mb-8">
				<Title first={"MY"} second={"ORDERS"} />
				<hr className="mt-2 border-gray-300" />
			</div>

			{loading ? (
				<div className="min-h-[60vh] flex items-center justify-center">
					<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-black"></div>
				</div>
			) : orderData.length > 0 ? (
				<div className="bg-white rounded-lg shadow-md overflow-hidden">
					<div className="max-h-[60vh] overflow-y-auto divide-y divide-gray-200">
						{orderData.map((item, index) => (
							<ProductInOrder
								key={index}
								prodData={item}
								getOrderData={getOrderData}
							/>
						))}
					</div>
				</div>
			) : (
				<div className="min-h-[60vh] flex flex-col items-center justify-center text-center gap-6">
					<HiOutlineShoppingBag className="text-6xl text-gray-400" />
					<p className="text-2xl font-semibold text-gray-600">
						No orders found
					</p>
					<p className="text-sm text-gray-500 max-w-md">
						It seems you haven't placed any orders yet. Start
						exploring our collections!
					</p>
					<button
						onClick={() => navigate("/collection")}
						className="px-6 py-3 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors"
					>
						Start Shopping
					</button>
				</div>
			)}
		</div>
	);
}

export default Orders;
