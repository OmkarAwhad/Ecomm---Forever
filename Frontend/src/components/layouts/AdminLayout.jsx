import React from "react";
import { NavLink } from "react-router-dom";
import { CiViewList } from "react-icons/ci";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";

function AdminLayout() {
	const dashboardCards = [
		{
			title: "Add Items",
			description: "Add new products to your store",
			path: "/admin/add",
			icon: IoMdAddCircleOutline,
			color: "text-blue-500",
			bgColor: "bg-blue-50",
		},
		{
			title: "List Items",
			description: "View and manage all products",
			path: "/admin/list",
			icon: CiViewList,
			color: "text-green-500",
			bgColor: "bg-green-50",
		},
		{
			title: "Orders",
			description: "Manage customer orders",
			path: "/admin/orders",
			icon: FaShoppingCart,
			color: "text-purple-500",
			bgColor: "bg-purple-50",
		},
	];

	return (
		<div className="min-h-fit p-2 sm:p-0">
			<div className="mb-6 sm:mb-8 text-center sm:text-left">
				<h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 sm:mb-4">
					Admin Dashboard
				</h1>
				<p className="text-gray-600 text-base sm:text-lg max-w-2xl">
					Welcome to the admin panel. Manage your store
					efficiently with our comprehensive tools.
				</p>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
				{dashboardCards.map((card, index) => {
					const IconComponent = card.icon;
					return (
						<NavLink
							key={index}
							to={card.path}
							className="bg-white border-2 border-gray-200 rounded-xl p-4 sm:p-6 hover:border-[#c486a5] hover:shadow-xl active:scale-[0.98] transition-all duration-300 group"
						>
							<div className="flex flex-col items-center text-center">
								<div
									className={`${card.bgColor} p-3 sm:p-4 rounded-xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}
								>
									<IconComponent
										className={`h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 ${card.color}`}
									/>
								</div>
								<h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 group-hover:text-[#c486a5] transition-colors">
									{card.title}
								</h3>
								<p className="text-gray-600 text-sm sm:text-base leading-relaxed">
									{card.description}
								</p>
							</div>
						</NavLink>
					);
				})}
			</div>
		</div>
	);
}

export default AdminLayout;
