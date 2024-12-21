/* eslint-disable no-unused-vars */
import React from "react";

function NewsLetterBox() {
	const onSubmitHandler = (e) => {
		e.preventDefault();
	};

	return (
		<div className="text-center">
			<p className="text-2xl font-medium text-gray-800 ">
				Subscribe now & get 20% off
			</p>
			<p className="text-gray-400 mt-3">
				Lorem Ipsum is simply dummy text of the printing and
				typesetting industry.{" "}
			</p>
			<form
				onSubmit={onSubmitHandler}
				className="flex w-full sm:w-1/2 items-center mx-auto my-5 gap-3 border pl-3 "
			>
				<input
					type="email"
					placeholder="Enter your email"
					className="w-full sm:flex outline-none "
					required
					name=""
					id=""
				/>
				<button
					type="submit"
					className=" bg-black text-white text-xs py-4 px-10 "
				>
					SUBSCRIBE
				</button>
			</form>
		</div>
	);
}

export default NewsLetterBox;
