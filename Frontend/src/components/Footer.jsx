/* eslint-disable no-unused-vars */
import React from "react";
import { assets } from "../assets/frontend_assets/assets";

function Footer() {
	return (
		<div className="mt-20">
			<div className="flex flex-col sm:flex-row justify-between gap-4 items-center sm:items-start sm:gap-10 py-10 ">
				<div className=" w-full sm:w-2/5 flex flex-col sm:items-start items-center">
					<img src={assets.logo} alt="Logo" className=" w-28 sm:w-36 mb-10" />
					<p className=" text-sm text-center sm:text-start text-gray-500 ">
						Lorem, ipsum dolor sit amet consectetur
						adipisicing elit. Vero, eligendi? Rerum, id.
						Soluta debitis saepe aut similique odit, corrupti
						laborum officiis eaque. Dolor, ullam
						exercitationem porro pariatur assumenda recusandae
						modi ratione placeat iste perspiciatis at hic
						quisquam fuga
					</p>
				</div>
				<div className="text-gray-500">
					<h1 className="mb-6 hidden font-medium sm:block">COMPANY</h1>
					<ul className="flex gap-2 sm:flex-col sm:gap-3">
						<li>Home</li>
						<li>About us</li>
						<li>Delivery</li>
						<li>Privacy Policy</li>
					</ul>
				</div>
            <div className="text-gray-500">
					<h1 className="mb-6 hidden font-medium sm:block">GET IN TOUCH</h1>
               <ul className="flex gap-2 sm:flex-col sm:gap-3">
						<li>+1-212-456-7890</li>
						<li>xyz@gmail.com</li>
					</ul>
				</div>
			</div>

         <div>
            <hr className="bg-gray-700" />
            <p className="text-center text-gray-500 p-5 text-xs">Copyright 2024 © GreatStack.dev - All Right Reserved.</p>
         </div>
		</div>
	);
}

export default Footer;
