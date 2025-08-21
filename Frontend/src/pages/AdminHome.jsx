import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/admin/AdminNavbar";
import AdminSidebar from "../components/admin/AdminSidebar";
import { FiMenu, FiX } from "react-icons/fi";

function AdminHome() {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<div className="min-h-screen bg-gray-50">
			<AdminNavbar />

			{/* Mobile menu button */}
			<button
				onClick={() => setSidebarOpen(!sidebarOpen)}
				className="lg:hidden fixed top-16 left-4 z-30 p-2 bg-white rounded-lg shadow-md border"
			>
				{sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
			</button>

			{/* Sidebar overlay for mobile */}
			{sidebarOpen && (
				<div
					className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
					onClick={() => setSidebarOpen(false)}
				/>
			)}

			<div className="flex">
				{/* Sidebar */}
				<div
					className={`
               fixed left-0 top-14 sm:top-16 h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] 
               w-56 sm:w-64 bg-white border-r border-gray-200 z-10
               transform transition-transform duration-300 ease-in-out
               ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
               lg:translate-x-0
            `}
				>
					<AdminSidebar />
				</div>

				{/* Main content */}
				<div className="flex-1 lg:ml-64 mt-14 sm:mt-16 p-3 sm:p-6 min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)]">
					<Outlet />
				</div>
			</div>
		</div>
	);
}

export default AdminHome;
