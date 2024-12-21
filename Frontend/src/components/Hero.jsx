/* eslint-disable no-unused-vars */
import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const Hero = () => {
	return (
		<div className="flex flex-col sm:flex-row border border-gray-400 ">
			{/* Left */}
			<div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 ">
				<div className="text-[#414141]">
					<div className="flex items-center gap-2 ">
						<p className="w-8 md:w-11 h-[2px] bg-[#414141] "></p>
						<p className="font-semibold text-sm md:text-base ">
							OUR BESTSELLERS
						</p>
					</div>
					<h1 className="text-3xl sm:py-3 lg:text-5xl prata-regular leading-relaxed ">
						Latest Arrivals
					</h1>
					<div className="flex items-center gap-2 ">
						<p className="font-semibold text-sm md:text-base ">
							SHOP NOW
						</p>
						<p className="w-8 md:w-11 h-[1.5px] bg-[#414141] "></p>
					</div>
				</div>
			</div>

			{/* Right */}
			<img
				src={assets.hero_img}
				alt="Hero_Image"
				className="w-full sm:w-1/2 "
			/>
		</div>
	);
};

export default Hero;
