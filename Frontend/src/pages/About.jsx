import React from "react";
import Title from "../components/endUser/Title";
import { assets } from "../assets/frontend_assets/assets";
import NewsLetterBox from "../components/endUser/NewsLetterBox";

function About() {
	return (
		<div className="min-h-screen mt-28">
			{/* Header */}
			<div className="text-2xl w-full flex items-center justify-center mt-10 mb-8 px-4">
				<Title first={"ABOUT"} second={"US"} />
			</div>

			{/* Main About Section */}
			<div className="flex flex-col lg:flex-row gap-8 lg:gap-14 my-10 items-center lg:items-start px-4 sm:px-6 lg:px-8">
				{/* Image */}
				<div className="w-full lg:w-1/2 flex justify-center">
					<img
						src={assets.about_img}
						className="w-full max-w-[590px] h-auto object-cover rounded-lg"
						alt="About us"
					/>
				</div>

				{/* Text Content */}
				<div className="w-full lg:w-1/2 flex flex-col gap-6 text-gray-600 text-center lg:text-left">
					<p className="text-sm sm:text-base leading-relaxed">
						Forever was born out of a passion for innovation
						and a desire to revolutionize the way people shop
						online. Our journey began with a simple idea: to
						provide a platform where customers can easily
						discover, explore, and purchase a wide range of
						products from the comfort of their homes.
					</p>
					<p className="text-sm sm:text-base leading-relaxed">
						Since our inception, we've worked tirelessly to
						curate a diverse selection of high-quality
						products that cater to every taste and preference.
						From fashion and beauty to electronics and home
						essentials, we offer an extensive collection
						sourced from trusted brands and suppliers.
					</p>
					<p className="text-gray-800 font-semibold text-base sm:text-lg mt-4">
						Our Mission
					</p>
					<p className="text-sm sm:text-base leading-relaxed">
						Our mission at Forever is to empower customers
						with choice, convenience, and confidence. We're
						dedicated to providing a seamless shopping
						experience that exceeds expectations, from
						browsing and ordering to delivery and beyond.
					</p>
				</div>
			</div>

			{/* Why Choose Us Section */}
			<div className="my-16 sm:my-20 px-4 sm:px-6 lg:px-8">
				<div className="text-2xl mb-8 text-center lg:text-left">
					<Title first={"WHY"} second={"CHOOSE US"} />
				</div>

				{/* Features Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-0">
					<div className="border border-gray-200 p-6 sm:p-8 lg:p-12 xl:p-20 flex flex-col gap-4 lg:gap-5 hover:shadow-lg transition-shadow duration-300">
						<h3 className="font-semibold text-black text-sm sm:text-base">
							QUALITY ASSURANCE:
						</h3>
						<p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
							We meticulously select and vet each product
							to ensure it meets our stringent quality
							standards.
						</p>
					</div>

					<div className="border border-gray-200 p-6 sm:p-8 lg:p-12 xl:p-20 flex flex-col gap-4 lg:gap-5 hover:shadow-lg transition-shadow duration-300">
						<h3 className="font-semibold text-black text-sm sm:text-base">
							CONVENIENCE
						</h3>
						<p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
							With our user-friendly interface and
							hassle-free ordering process, shopping has
							never been easier.
						</p>
					</div>

					<div className="border border-gray-200 p-6 sm:p-8 lg:p-12 xl:p-20 flex flex-col gap-4 lg:gap-5 hover:shadow-lg transition-shadow duration-300 md:col-span-2 lg:col-span-1">
						<h3 className="font-semibold text-black text-sm sm:text-base">
							EXCEPTIONAL CUSTOMER SERVICE:
						</h3>
						<p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
							Our team of dedicated professionals is here
							to assist you the way, ensuring your
							satisfaction is our top priority.
						</p>
					</div>
				</div>
			</div>

			{/* Newsletter Section */}
			<div className="min-h-[300px] sm:min-h-[400px] p-8 sm:p-16 lg:p-32">
				<NewsLetterBox />
			</div>
		</div>
	);
}

export default About;
