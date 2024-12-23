/* eslint-disable no-unused-vars */
import React, { useState } from "react";

function Login() {
	const [currentState, setCurrentState] = useState("Login");

   const submitHandler = async (e) => {
      e.preventDefault();
   }

	return (
		<form onSubmit={submitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 ">
			<div className=" inline-flex items-center gap-2 mb-2 mt-10 ">
				<p className=" prata-regular text-3xl ">{currentState}</p>
				<hr className=" border-none h-[1.5px] w-8 bg-gray-800 " />
			</div>
			{currentState === "Login" ? (
				""
			) : (
				<input
					type="text"
					required
					className="w-full px-3 py-2 border border-gray-800 "
					placeholder="Name"
				/>
			)}
			<input
				type="email"
				required
				className="w-full px-3 py-2 border border-gray-800 "
				placeholder="Email"
			/>
			<input
				type="password"
				required
				className="w-full px-3 py-2 border border-gray-800 "
				placeholder="Password"
			/>
			<div className=" w-full flex justify-end text-sm mt-[-8px] ">
				{currentState === "Login" ? (
					<p className="cursor-pointer pr-24 sm:pr-36">
						Forgot your password?
					</p>
				) : (
					""
				)}
				{currentState === "Login" ? (
					<p
						onClick={() => setCurrentState("Sign Up")}
						className="cursor-pointer"
					>
						Create account
					</p>
				) : (
					<p
						onClick={() => setCurrentState("Login")}
						className="cursor-pointer"
					>
						Login here
					</p>
				)}
			</div>
			<button className="px-8 py-2 text-sm bg-black text-white">
				{currentState === "Login" ? `Sign in` : `Create`}
			</button>
		</form>
	);
}

export default Login;
