import React, { useContext } from "react";
import { ShopDataContext } from "../../context/ShopContext";
import { assets } from "../../assets/frontend_assets/assets";

function ProductInOrder({ prodData, getOrderData }) {
	const { currency } = useContext(ShopDataContext);

	const getStatusColor = (status) => {
		const statusColors = {
			"Order Placed": "bg-blue-500",
			Packing: "bg-yellow-500",
			Shipped: "bg-purple-500",
			"Out for delivery": "bg-orange-500",
			Delivered: "bg-green-500",
		};
		return statusColors[status] || "bg-gray-500";
	};

	return (
		<div className="py-4 px-3 sm:px-4 mx-auto border-b border-gray-200 last:border-b-0">
			{/* Mobile Layout */}
			<div className="block lg:hidden">
				<div className="flex gap-3 mb-3">
					<img
						src={prodData?.product?.images[0]}
						alt="Product"
						className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg flex-shrink-0"
					/>
					<div className="flex-1 min-w-0">
						<h3 className="font-semibold text-sm sm:text-base text-gray-800 mb-1 truncate">
							{prodData?.name}
						</h3>
						<div className="space-y-1 text-xs sm:text-sm text-gray-600">
							<p className="font-medium text-gray-800">
								{currency}
								{prodData.price}
							</p>
							<p>
								Qty: {prodData.quantity} | Size:{" "}
								{prodData.size}
							</p>
						</div>
					</div>
				</div>

				<div className="space-y-2 mb-3">
					<div className="flex justify-between items-center text-xs sm:text-sm text-gray-600">
						<span>Date:</span>
						<span>
							{new Date(
								prodData.date
							).toLocaleDateString()}
						</span>
					</div>
					<div className="flex justify-between items-center text-xs sm:text-sm text-gray-600">
						<span>Payment:</span>
						<span>{prodData.paymentMethod}</span>
					</div>
				</div>

				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<div
							className={`w-2 h-2 rounded-full ${getStatusColor(
								prodData.status
							)}`}
						></div>
						<span className="text-xs sm:text-sm font-medium text-gray-700">
							{prodData.status}
						</span>
					</div>
					<button
						onClick={getOrderData}
						className="px-3 py-1.5 border border-gray-300 rounded-md text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
					>
						Track Order
					</button>
				</div>
			</div>

			{/* Desktop Layout */}
			<div className="hidden lg:grid lg:grid-cols-[2fr_1fr_1fr_auto] gap-6 items-center">
				<div className="flex items-start gap-4">
					<img
						src={prodData?.product?.images[0]}
						alt="Product"
						className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
					/>
					<div className="flex-1">
						<h3 className="font-semibold text-base text-gray-800 mb-2">
							{prodData?.name}
						</h3>
						<div className="flex items-center gap-6 text-sm text-gray-600">
							<span className="font-medium text-gray-800">
								{currency}
								{prodData.price}
							</span>
							<span>Qty: {prodData.quantity}</span>
							<span>Size: {prodData.size}</span>
						</div>
					</div>
				</div>

				<div className="text-sm text-gray-600 space-y-1">
					<p>
						Date:{" "}
						{new Date(prodData.date).toLocaleDateString()}
					</p>
					<p>Payment: {prodData.paymentMethod}</p>
				</div>

				<div className="flex items-center gap-3">
					<div
						className={`w-2 h-2 rounded-full ${getStatusColor(
							prodData.status
						)}`}
					></div>
					<span className="text-sm font-medium text-gray-700">
						{prodData.status}
					</span>
				</div>

				<button
					onClick={getOrderData}
					className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
				>
					Track Order
				</button>
			</div>
		</div>
	);
}

export default ProductInOrder;
