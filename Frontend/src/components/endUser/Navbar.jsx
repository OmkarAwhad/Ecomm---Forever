import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { assets } from "../../assets/frontend_assets/assets";
import { ShopDataContext } from "../../context/ShopContext";
import Modal from "../layouts/Modal";

const Navbar = () => {
	const [visible, setVisible] = useState(false);
	const {
		setShowSearch,
		getCartCount,
		setToken,
		setRole,
		setCartItems,
		token,
		logout,
		navigate,
	} = useContext(ShopDataContext);
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
		<>
			<div className="mb-4 fixed w-full top-0 z-10 bg-white shadow-sm">
				<div className="flex w-[90%] md:w-[80%] mx-auto md:mx-0 items-center justify-between py-5 font-medium">
					<Link to={"/"}>
						<img
							src={assets.logo}
							alt="Forever Logo"
							className="w-36"
						/>
					</Link>

					<ul className="hidden sm:flex gap-5 text-sm text-gray-700">
						<NavLink
							to={"/"}
							className={({ isActive }) =>
								`flex flex-col items-center gap-1 ${
									isActive ? "text-black" : ""
								}`
							}
						>
							<p>HOME</p>
							<hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
						</NavLink>
						<NavLink
							to={"/collection"}
							className={({ isActive }) =>
								`flex flex-col items-center gap-1 ${
									isActive ? "text-black" : ""
								}`
							}
						>
							<p>COLLECTION</p>
							<hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
						</NavLink>
						<NavLink
							to={"/about"}
							className={({ isActive }) =>
								`flex flex-col items-center gap-1 ${
									isActive ? "text-black" : ""
								}`
							}
						>
							<p>ABOUT</p>
							<hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
						</NavLink>
						<NavLink
							to={"/contact"}
							className={({ isActive }) =>
								`flex flex-col items-center gap-1 ${
									isActive ? "text-black" : ""
								}`
							}
						>
							<p>CONTACT</p>
							<hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
						</NavLink>
					</ul>

					<div className="flex items-center gap-6">
						<img
							src={assets.search_icon}
							alt="Search_Icon"
							className="w-5 cursor-pointer"
							onClick={() => {
								navigate("/collection");
							}}
						/>

						{token ? (
							<>
								<div className="group relative">
									<img
										src={assets.profile_icon}
										alt="Profile_Icon"
										className="w-5 cursor-pointer"
									/>
									<div className="group-hover:block hidden dropdown-menu absolute right-0 pt-4">
										<div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
											<p
												onClick={() =>
													navigate(
														"/orders"
													)
												}
												className="cursor-pointer hover:text-black"
											>
												Orders
											</p>
											<p
												onClick={
													handleLogoutClick
												}
												className="cursor-pointer hover:text-black"
											>
												Logout
											</p>
										</div>
									</div>
								</div>

								<Link to="/cart" className="relative">
									<img
										src={assets.cart_icon}
										alt="Cart_icon"
										className="w-5 min-w-5"
									/>
									<span className="absolute bg-black text-white text-xs w-4 rounded-full text-center -right-1 top-3 aspect-square leading-4">
										{getCartCount()}
									</span>
								</Link>
							</>
						) : (
							<button
								onClick={() => navigate("/login")}
								className="px-3 py-1 border border-gray-500 rounded-md text-gray-600"
							>
								Login
							</button>
						)}

						<img
							onClick={() => setVisible(true)}
							src={assets.menu_icon}
							alt="Menu_Icon"
							className="w-5 sm:hidden block cursor-pointer"
						/>
					</div>
				</div>
				<hr />
			</div>

			{/* Fixed Mobile Sidebar */}
			{visible && (
				<div className="fixed inset-0 z-50 sm:hidden">
					{/* Background overlay */}
					<div
						className="fixed inset-0 bg-black bg-opacity-50"
						onClick={() => setVisible(false)}
					/>

					{/* Sidebar */}
					<div className="fixed top-0 right-0 h-full w-80 mx-auto bg-white shadow-lg transform transition-transform duration-300 ease-in-out">
						<div className="flex flex-col text-gray-600">
							<div
								onClick={() => setVisible(false)}
								className="flex items-center gap-4 p-4 cursor-pointer border-b"
							>
								<img
									src={assets.dropdown_icon}
									alt="Dropdown_Icon"
									className="h-4 rotate-180"
								/>
								<p>Back</p>
							</div>

							<NavLink
								onClick={() => setVisible(false)}
								to={"/"}
								className={({ isActive }) =>
									`py-4 pl-6 border-b text-lg ${
										isActive
											? "bg-gray-100 text-black font-semibold"
											: "hover:bg-gray-50"
									}`
								}
							>
								HOME
							</NavLink>

							<NavLink
								onClick={() => setVisible(false)}
								to={"/collection"}
								className={({ isActive }) =>
									`py-4 pl-6 border-b text-lg ${
										isActive
											? "bg-gray-100 text-black font-semibold"
											: "hover:bg-gray-50"
									}`
								}
							>
								COLLECTION
							</NavLink>

							<NavLink
								onClick={() => setVisible(false)}
								to={"/about"}
								className={({ isActive }) =>
									`py-4 pl-6 border-b text-lg ${
										isActive
											? "bg-gray-100 text-black font-semibold"
											: "hover:bg-gray-50"
									}`
								}
							>
								ABOUT
							</NavLink>

							<NavLink
								onClick={() => setVisible(false)}
								to={"/contact"}
								className={({ isActive }) =>
									`py-4 pl-6 border-b text-lg ${
										isActive
											? "bg-gray-100 text-black font-semibold"
											: "hover:bg-gray-50"
									}`
								}
							>
								CONTACT
							</NavLink>

							{/* Mobile Profile Section */}
							{token && (
								<div className="mt-4 border-t">
									<NavLink
										onClick={() => {
											setVisible(false);
											navigate("/orders");
										}}
										to="/orders"
										className="py-4 pl-6 border-b text-lg hover:bg-gray-50 block"
									>
										My Orders
									</NavLink>
									<button
										onClick={() => {
											setVisible(false);
											handleLogoutClick();
										}}
										className="py-4 pl-6 text-lg hover:bg-gray-50 text-left w-full"
									>
										Logout
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			)}

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
		</>
	);
};

export default Navbar;
