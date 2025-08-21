import React from "react";
import { NavLink } from "react-router-dom";
import { CiViewList } from "react-icons/ci";
import { MdDashboard } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { IoMdAddCircleOutline } from "react-icons/io";

function AdminSidebar() {
	const sidebarItems = [
		{
			name: "Dashboard",
			path: "/admin",
			icon: MdDashboard,
		},
		{
			name: "Add Items",
			path: "/admin/add",
			icon: IoMdAddCircleOutline,
		},
		{
			name: "List Items",
			path: "/admin/list",
			icon: CiViewList,
		},
		{
			name: "Orders",
			path: "/admin/orders",
			icon: TiTick,
		},
	];

	return (
		<div className="h-full bg-white p-2 sm:p-4">
			<div className="space-y-1 sm:space-y-2">
				{sidebarItems.map((item, index) => {
					const IconComponent = item.icon;
					return (
						<NavLink
							key={index}
							to={item.path}
							end={item.path === "/admin"}
							className={({ isActive }) =>
								`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg transition-all duration-200 group ${
									isActive
										? "bg-[#c486a5] text-white shadow-md"
										: "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
								}`
							}
						>
							<IconComponent className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-200" />
							<span className="font-medium text-sm sm:text-base">
								{item.name}
							</span>
						</NavLink>
					);
				})}
			</div>
		</div>
	);
}

export default AdminSidebar;
