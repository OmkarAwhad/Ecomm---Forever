import React from "react";
import Title from "../components/endUser/Title";
import { assets } from "../assets/frontend_assets/assets";
import NewsLetterBox from "../components/endUser/NewsLetterBox";

function About() {
	return (
		<div className="h-full mt-28">
			<div className="text-2xl w-full flex items-center justify-center mt-10 mb-5 ">
				<Title first={"ABOUT"} second={"US"} />
			</div>
			<div className="flex flex-col gap-x-14 my-10 items-center lg:flex-row">
				{/* Right side */}
				<img src={assets.about_img} className="w-[590px]" alt="" />
				<div className="flex flex-col gap-10 text-gray-600">
					<p>
						Forever was born out of a passion for innovation
						and a desire to revolutionize the way people shop
						online. Our journey began with a simple idea: to
						provide a platform where customers can easily
						discover, explore, and purchase a wide range of
						products from the comfort of their homes.
					</p>
					<p>
						Since our inception, we've worked tirelessly to
						curate a diverse selection of high-quality
						products that cater to every taste and preference.
						From fashion and beauty to electronics and home
						essentials, we offer an extensive collection
						sourced from trusted brands and suppliers.
					</p>
					<p className="text-gray-800 font-medium">
						Our Mission
					</p>
					<p>
						Our mission at Forever is to empower customers
						with choice, convenience, and confidence. We're
						dedicated to providing a seamless shopping
						experience that exceeds expectations, from
						browsing and ordering to delivery and beyond.
					</p>
				</div>
			</div>

			<div className="my-20">
				<div className="text-2xl ml-3 mb-4">
					<Title first={"WHY"} second={"CHOOSE US"} />
				</div>
				<div className="flex">
					<div className="border w-[40%] p-20 flex flex-col gap-5">
						<p className="font-medium text-black">
							QUALITY ASSURANCE:
						</p>
						<p className="text-gray-500">
							We meticulously select and vet each product
							to ensure it meets our stringent quality
							standards.
						</p>
					</div>
					<div className="border w-[40%] p-20 flex flex-col gap-5">
						<p className="font-medium text-black">
							CONVENIENCE
						</p>
						<p className="text-gray-500">
							With our user-friendly interface and
							hassle-free ordering process, shopping has
							never been easier.
						</p>
					</div>
					<div className="border w-[40%] p-20 flex flex-col gap-5">
						<p className="font-medium text-black">
							EXCEPTIONAL CUSTOMER SERVICE:
						</p>
						<p className="text-gray-500">
							Our team of dedicated professionals is here
							to assist you the way, ensuring your
							satisfaction is our top priority.
						</p>
					</div>
				</div>
			</div>

			<div className="h-[400px] p-32 ">
				<NewsLetterBox />
			</div>
		</div>
	);
}

export default About;
