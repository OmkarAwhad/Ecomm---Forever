import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ShopDataContext } from "../context/ShopContext";
import { useLocation } from "react-router-dom";

function VerifyOTP() {
	const { backendUrl, navigate } = useContext(ShopDataContext);
	const [otp, setOtp] = useState("");
	const [loading, setLoading] = useState(false);
	const location = useLocation();
	const email = location.state?.email || "";

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (loading) return;
		setLoading(true);

		try {
			const response = await axios.post(
				`${backendUrl}/user/verify-otp`,
				{
					email,
					otp,
				}
			);
			if (response.data.success) {
				toast.success(
					response.data.message || "OTP verified successfully"
				);
				navigate("/change-password", {
					state: { resetToken: response.data.resetToken },
				});
			} else {
				toast.error(
					response.data.message || "Failed to verify OTP"
				);
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
				<p className="prata-regular text-3xl">Verify OTP</p>
				<hr className="border-none h-[1.5px] w-8 bg-gray-800" />
			</div>

			<p className="text-sm text-gray-600">
				Enter the OTP sent to {email}
			</p>

			<input
				type="text"
				required
				value={otp}
				onChange={(e) => setOtp(e.target.value)}
				className="w-full px-3 py-2 border border-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800"
				placeholder="Enter OTP"
			/>

			<div className="w-full flex justify-start text-sm mt-[-8px]">
				<p
					onClick={() => navigate("/forget-password")}
					className="cursor-pointer hover:underline"
				>
					Resend OTP
				</p>
			</div>

			<button
				type="submit"
				className="px-8 py-2 text-sm bg-black text-white disabled:opacity-60"
				disabled={loading}
			>
				{loading ? "Verifying..." : "Verify OTP"}
			</button>
		</form>
	);
}

export default VerifyOTP;
