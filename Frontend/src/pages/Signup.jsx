import React, { useContext, useEffect, useState } from "react";
import { ShopDataContext } from "../context/ShopContext";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import axios from "axios";
import { toast } from "react-toastify";

function Signup() {
	const { token, setToken, setRole, navigate, backendUrl } =
		useContext(ShopDataContext);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [showPass, setShowPass] = useState(false);
	const [loading, setLoading] = useState(false);

	const submitHandler = async (e) => {
		e.preventDefault();
		if (loading) return;
		setLoading(true);
		try {
			const response = await axios.post(`${backendUrl}/user/sign-up`, {
				name,
				email,
				password,
			});
			if (response.data?.success) {
				setToken(response.data.token);
				setRole(response.data.data.role);
				localStorage.setItem("role", response.data.data.role);
				localStorage.setItem("token", response.data.token);
				toast.success(response.data.message || "Account created");
			} else {
				toast.error(response.data?.message || "Sign up failed");
			}
		} catch (error) {
			console.error("Signup error", error);
			toast.error(
				error?.response?.data?.message ||
					error.message ||
					"Sign up failed"
			);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (token) {
			if (role === "User") navigate("/");
			else if (role === "Admin") navigate("/admin");
		}
	}, [token, navigate]);

	return (
		<form
			onSubmit={submitHandler}
			className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto my-40 gap-4 text-gray-800"
		>
			<div className="inline-flex items-center gap-2 mb-2 mt-10">
				<p className="prata-regular text-3xl">Sign Up</p>
				<hr className="border-none h-[1.5px] w-8 bg-gray-800" />
			</div>

			<input
				type="text"
				required
				value={name}
				onChange={(e) => setName(e.target.value)}
				className="w-full px-3 py-2 border border-gray-800"
				placeholder="Name"
				autoComplete="name"
			/>

			<input
				type="email"
				required
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				className="w-full px-3 py-2 border border-gray-800"
				placeholder="Email"
				autoComplete="email"
			/>

			<div className="flex items-center w-full px-3 border border-gray-800">
				<input
					type={showPass ? "text" : "password"}
					required
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="w-full py-2 outline-none"
					placeholder="Password"
					autoComplete="new-password"
				/>
				<button
					type="button"
					onClick={() => setShowPass((s) => !s)}
					className="p-1 text-gray-700"
					aria-label={
						showPass ? "Hide password" : "Show password"
					}
				>
					{showPass ? <FaEyeSlash /> : <FaEye />}
				</button>
			</div>

			<div className="w-full flex justify-start text-sm mt-[-8px]">
				<p
					onClick={() => navigate("/login")}
					className="cursor-pointer underline-offset-2"
				>
					Already have an account?
				</p>
			</div>

			<button
				type="submit"
				className="px-8 py-2 text-sm bg-black text-white disabled:opacity-60"
				disabled={loading}
			>
				{loading ? "Creating..." : "Create"}
			</button>
		</form>
	);
}

export default Signup;
