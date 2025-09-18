import React, { useContext, useEffect, useState } from "react";
import { ShopDataContext } from "../context/ShopContext";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import axios from "axios";
import { toast } from "react-hot-toast";

function Login() {
	const { token, role, setToken, setRole, navigate, backendUrl } =
		useContext(ShopDataContext);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPass, setShowPass] = useState(false);
	const [loading, setLoading] = useState(false);

	const submitHandler = async (e) => {
		e.preventDefault();
		if (loading) return;
		setLoading(true);
		try {
			const response = await axios.post(`${backendUrl}/user/login`, {
				email,
				password,
			});
			if (response.data?.success) {
				setToken(response.data.token);
				// Trim the role to remove any whitespace/newlines
				const cleanRole = response.data.data.role.trim();
				setRole(cleanRole);
				localStorage.setItem("role", cleanRole);
				localStorage.setItem("token", response.data.token);
				toast.success(
					response.data.message || "Logged in successfully"
				);
			} else {
				toast.error(response.data?.message || "Login failed");
			}
		} catch (error) {
			console.error("Login error", error);
			toast.error(
				error?.response?.data?.message ||
					error.message ||
					"Login failed"
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
				<p className="prata-regular text-3xl">Login</p>
				<hr className="border-none h-[1.5px] w-8 bg-gray-800" />
			</div>

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
					autoComplete="current-password"
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

			<div className="w-full flex justify-between text-sm mt-[-8px]">
				<p
					onClick={() => navigate("/forget-password")}
					className="cursor-pointer "
				>
					Forgot your password?
				</p>

				<p
					onClick={() => navigate("/signup")}
					className="cursor-pointer "
				>
					Create Account
				</p>
			</div>

			<button
				type="submit"
				className="px-8 py-2 text-sm bg-black text-white disabled:opacity-60"
				disabled={loading}
			>
				{loading ? "Signing in..." : "Sign in"}
			</button>
		</form>
	);
}

export default Login;
