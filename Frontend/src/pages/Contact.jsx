import React from "react";
import Title from "../components/endUser/Title";
import { assets } from "../assets/frontend_assets/assets";
import NewsLetterBox from "../components/endUser/NewsLetterBox";

function Contact() {
	return (
		<div className="w-full min-h-screen mt-28">
			{/* Header */}
			<div className="text-2xl flex items-center justify-center my-8 px-4">
				<Title first={"CONTACT"} second={"US"} />
			</div>

			{/* Main Content */}
			<div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-10 px-4 sm:px-6 lg:px-8 xl:px-20 mb-16">
				{/* Image */}
				<div className="w-full lg:w-1/2 flex justify-center">
					<img
						src={assets.contact_img}
						className="w-full max-w-[590px] h-auto object-cover rounded-lg"
						alt="Contact us"
					/>
				</div>

				{/* Contact Information */}
				<div className="w-full lg:w-1/2 flex flex-col gap-6 sm:gap-7 text-gray-600 text-center lg:text-left max-w-md lg:max-w-none">
					<h2 className="font-bold text-gray-600 text-base sm:text-lg">
						OUR STORE
					</h2>

					<div className="space-y-1">
						<p className="text-sm sm:text-base">
							54709 Willms Station
						</p>
						<p className="text-sm sm:text-base">
							Suite 350, Washington, USA
						</p>
					</div>

					<div className="space-y-1">
						<p className="text-sm sm:text-base">
							Tel: (415) 555‑0132
						</p>
						<p className="text-sm sm:text-base">
							Email: xyz@gmail.com
						</p>
					</div>

					<h2 className="font-bold text-gray-600 text-base sm:text-lg mt-4">
						CAREERS AT FOREVER
					</h2>

					<p className="text-sm sm:text-base leading-relaxed">
						Learn more about our teams and job openings.
					</p>

					<button className="px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-6 border-2 border-gray-300 w-fit mx-auto lg:mx-0 text-sm sm:text-base font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 rounded-sm">
						Explore Jobs
					</button>
				</div>
			</div>

			{/* Newsletter Section */}
			<div className="min-h-[300px] sm:min-h-[400px] p-8 sm:p-16 lg:p-32 xl:p-40">
				<NewsLetterBox />
			</div>
		</div>
	);
}

export default Contact;
