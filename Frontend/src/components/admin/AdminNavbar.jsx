import React, { useContext } from "react";
import { ShopDataContext } from "../../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/admin_assets/assets";
import Modal from "../layouts/Modal";
import { useState } from "react";

function AdminNavbar() {
	const { setToken } = useContext(ShopDataContext);
	const navigate = useNavigate();
	const [showLogoutModal, setShowLogoutModal] = useState(false);

	const handleLogoutClick = () => {
		setShowLogoutModal(true);
	};

	const handleLogoutConfirm = async () => {
		try {
			localStorage.removeItem("token");
			setToken("");
			navigate("/login");
			setShowLogoutModal(false);
		} catch (error) {
			console.error("Error logging out:", error);
		}
	};

	const handleLogoutCancel = () => {
		setShowLogoutModal(false);
	};

	return (
		<div className="fixed top-0 left-0 right-0 h-14 sm:h-16 bg-white border-b border-gray-200 flex items-center justify-between px-3 sm:px-6 z-20 shadow-sm">
			<div className="flex items-center">
				<img
					src={assets.logo}
					alt="Forever logo"
					className="h-8 sm:h-[50px] transition-all duration-200"
				/>
			</div>

			<div className="flex items-center gap-2 sm:gap-4">
				<button
					onClick={handleLogoutClick}
					className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#c486a5] text-white text-sm sm:text-base rounded-lg hover:bg-[#b17a99] active:scale-95 transition-all duration-200 font-medium"
				>
					Logout
				</button>
			</div>

			{showLogoutModal && (
				<Modal
					title="Log out"
					description="Are you sure you want to logout?"
					btn1={{
						text: "Log Out",
						onClick: handleLogoutConfirm,
					}}
					btn2={{
						text: "Cancel",
						onClick: handleLogoutCancel,
					}}
				/>
			)}
		</div>
	);
}

export default AdminNavbar;
