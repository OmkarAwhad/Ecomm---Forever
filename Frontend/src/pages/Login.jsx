/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { ShopDataContext } from "../context/ShopContext";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
	const [currentState, setCurrentState] = useState("Login");
	const { token, setToken, navigate, backendUrl } =
		useContext(ShopDataContext);

	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");

	const [showPass, setShowPass] = useState(false);

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			if (currentState === 'Sign Up') {
				const response = await axios.post(backendUrl + '/user/sign-up', { name, email, password })
				if (response.data.success) {
					setToken(response.data.token)
					localStorage.setItem('token', response.data.token)
					toast.success(response.data.message)
				} else {
					toast.error(response.data.message)
				}
			} else {
				const response = await axios.post(backendUrl + '/user/login', { email, password })
				console.log(response)
				if (response.data.success) {
					setToken(response.data.token)
					localStorage.setItem('token', response.data.token)
					toast.success(response.data.message)
				} else {
					toast.error(response.data.message)
				}
			}
		} catch (error) {
			console.log("Error ", error);
			toast.error(error.message)
		}
	};

	useEffect(()=>{
		if(token){
			navigate('/')
		}
	},[token])

	return (
		<form
			onSubmit={submitHandler}
			className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 "
		>
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
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="w-full px-3 py-2 border border-gray-800 "
					placeholder="Name"
				/>
			)}
			<input
				type="email"
				required
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				className="w-full px-3 py-2 border border-gray-800 "
				placeholder="Email"
			/>
			<div className="flex items-center w-full px-3 border border-gray-800">
				<input
					type={showPass ? "text" : "password"}
					required
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className=" w-full py-2 outline-none "
					placeholder="Password"
				/>
				<div onClick={() => setShowPass(!showPass)}>
					{showPass ? <FaEyeSlash /> : <FaEye />}
				</div>
			</div>
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
