import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ShopDataContext } from "../context/ShopContext";

function ForgetPassword() {
	const { backendUrl, navigate } = useContext(ShopDataContext);
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (loading) return;
		setLoading(true);

		try {
			const response = await axios.post(
				`${backendUrl}/user/forget-password`,
				{
					email,
				}
			);
			if (response.data.success) {
				toast.success(
					response.data.message || "OTP sent to your email"
				);
				navigate("/verify-otp", { state: { email } });
			} else {
				toast.error(response.data.message || "Failed to send OTP");
			}
		} catch (error) {
			toast.error(
				error.response?.data?.message || "Something went wrong"
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto my-40 gap-4 text-gray-800"
		>
			<div className="inline-flex items-center gap-2 mb-2 mt-10">
				<p className="prata-regular text-3xl">Forgot Password</p>
				<hr className="border-none h-[1.5px] w-8 bg-gray-800" />
			</div>

			<input
				type="email"
				required
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				className="w-full px-3 py-2 border border-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800"
				placeholder="Email"
				autoComplete="email"
			/>

			<div className="w-full flex justify-between text-sm mt-[-8px]">
				<p
					onClick={() => navigate("/login")}
					className="cursor-pointer hover:underline"
				>
					Back to Login
				</p>
				<p
					onClick={() => navigate("/signup")}
					className="cursor-pointer hover:underline"
				>
					Create Account
				</p>
			</div>

			<button
				type="submit"
				className="px-8 py-2 text-sm bg-black text-white disabled:opacity-60"
				disabled={loading}
			>
				{loading ? "Sending..." : "Send OTP"}
			</button>
		</form>
	);
}

export default ForgetPassword;
