/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";
import { ShopDataContext } from "../context/ShopContext";

const Navbar = () => {
	const [visible, setVisible] = useState(false);
	const {
		setShowSearch,
		getCartCount,
		setToken,
		setCartItems,
		token,
		navigate,
	} = useContext(ShopDataContext);

	const logout = () => {
		navigate("/login");
		localStorage.removeItem("token");
		setToken("");
		setCartItems({});
	};

	return (
		<div className="mb-4">
			<div className="flex items-center justify-between py-5 font-medium ">
				<Link to={"/"}>
					<img
						src={assets.logo}
						alt="Forever Logo"
						className="w-36"
					/>
				</Link>

				<ul className="hidden sm:flex gap-5 text-sm text-gray-700 ">
					<NavLink
						to={"/"}
						className="flex flex-col items-center gap-1"
					>
						<p>HOME</p>
						<hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden " />
					</NavLink>
					<NavLink
						to={"/collection"}
						className="flex flex-col items-center gap-1"
					>
						<p>COLLECTION</p>
						<hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden " />
					</NavLink>
					<NavLink
						to={"/about"}
						className="flex flex-col items-center gap-1"
					>
						<p>ABOUT</p>
						<hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden " />
					</NavLink>
					<NavLink
						to={"/contact"}
						className="flex flex-col items-center gap-1"
					>
						<p>CONTACT</p>
						<hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden " />
					</NavLink>
				</ul>

				<div className="flex items-center gap-6 ">
					<img
						src={assets.search_icon}
						alt="Search_Icon"
						className="w-5 cursor-pointer "
						onClick={() => setShowSearch(true)}
					/>

					<div className="group relative ">
						<img
							src={assets.profile_icon}
							alt="Profile_Icon"
							onClick={() =>
								token ? null : navigate("/login")
							}
							className="w-5 cursor-pointer"
						/>
						{token ? (
							<div className=" group-hover:block hidden dropdown-menu absolute right-0 pt-4 ">
								<div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded ">
									<p className="cursor-pointer hover:text-black ">
										My Profile
									</p>
									<p onClick={()=>navigate('/orders')} className="cursor-pointer hover:text-black ">
										Orders
									</p>
									<p
										onClick={logout}
										className="cursor-pointer hover:text-black "
									>
										Logout
									</p>
								</div>
							</div>
						) : null}
					</div>
					<Link to="/cart" className=" relative ">
						<img
							src={assets.cart_icon}
							alt="Cart_icon"
							className="w-5 min -w-5 "
						/>
						<span className="absolute bg-black text-white text-xs w-4 rounded-full text-center -right-1 top-3 aspect-square leading-4 ">
							{getCartCount()}
						</span>
					</Link>

					<img
						onClick={() => setVisible(true)}
						src={assets.menu_icon}
						alt="Menu_Icon"
						className={`w-5 sm:hidden block cursor-pointer `}
					/>
				</div>

				{/* Sidebar */}
				<div
					className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? "w-full" : "w-0"
						} `}
				>
					<div className="flex flex-col text-gray-600 ">
						<div
							onClick={() => setVisible(false)}
							className="flex items-center gap-4 p-3 cursor-pointer "
						>
							<img
								src={assets.dropdown_icon}
								alt="Dropdown_Icon"
								className="h-4 rotate-180 "
							/>
							<p>Back</p>
						</div>
						<NavLink
							onClick={() => setVisible(false)}
							to={"/"}
							className="py-2 pl-6 border"
						>
							<p>HOME</p>
						</NavLink>
						<NavLink
							onClick={() => setVisible(false)}
							to={"/collection"}
							className="py-2 pl-6 border"
						>
							<p>COLLECTION</p>
						</NavLink>
						<NavLink
							onClick={() => setVisible(false)}
							to={"/about"}
							className="py-2 pl-6 border"
						>
							<p>ABOUT</p>
						</NavLink>
						<NavLink
							onClick={() => setVisible(false)}
							to={"/contact"}
							className="py-2 pl-6 border"
						>
							<p>CONTACT</p>
						</NavLink>
					</div>
				</div>
			</div>
			<hr />
		</div>
	);
};

export default Navbar;
