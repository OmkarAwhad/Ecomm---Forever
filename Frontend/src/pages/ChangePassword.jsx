import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ShopDataContext } from "../context/ShopContext";
import { useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

function ChangePassword() {
	const { backendUrl, navigate } = useContext(ShopDataContext);
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPass1, setShowPass1] = useState(false);
	const [showPass2, setShowPass2] = useState(false);
	const [loading, setLoading] = useState(false);
	const location = useLocation();
	const resetToken = location.state?.resetToken || "";

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (loading) return;
		setLoading(true);

		if (newPassword !== confirmPassword) {
			toast.error("Passwords do not match");
			setLoading(false);
			return;
		}

		if (newPassword.length < 8) {
			toast.error("Password must be at least 8 characters");
			setLoading(false);
			return;
		}

		try {
			const response = await axios.post(
				`${backendUrl}/user/change-password`,
				{
					token: resetToken,
					newPassword,
				}
			);
			if (response.data.success) {
				toast.success(
					response.data.message ||
						"Password changed successfully"
				);
				setTimeout(() => navigate("/login"), 2000);
			} else {
				toast.error(
					response.data.message || "Failed to change password"
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
				<p className="prata-regular text-3xl">Change Password</p>
				<hr className="border-none h-[1.5px] w-8 bg-gray-800" />
			</div>

			<div className="flex items-center w-full px-3 border border-gray-800">
				<input
					type={showPass1 ? "text" : "password"}
					required
					value={newPassword}
					onChange={(e) => setNewPassword(e.target.value)}
					className="w-full py-2 outline-none "
					placeholder="New Password"
					autoComplete="new-password"
				/>
				<button
					type="button"
					onClick={() => setShowPass1((s) => !s)}
					className="p-1 text-gray-700"
					aria-label={
						showPass1 ? "Hide password" : "Show password"
					}
				>
					{showPass1 ? <FaEyeSlash /> : <FaEye />}
				</button>
			</div>

			<div className="flex items-center w-full px-3 border border-gray-800">
				<input
					type={showPass2 ? "text" : "password"}
					required
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					className="w-full py-2 outline-none"
					placeholder="Confirm Password"
					autoComplete="new-password"
				/>
				<button
					type="button"
					onClick={() => setShowPass2((s) => !s)}
					className="p-1 text-gray-700"
					// aria-label={
					// 	haunting ? "Hide password" : "Show password"
					// }
				>
					{showPass2 ? <FaEyeSlash /> : <FaEye />}
				</button>
			</div>

			<div className="w-full flex justify-start text-sm mt-[-8px]">
				<p
					onClick={() => navigate("/login")}
					className="cursor-pointer hover:underline"
				>
					Back to Login
				</p>
			</div>

			<button
				type="submit"
				className="px-8 py-2 text-sm bg-black text-white disabled:opacity-60"
				disabled={loading}
			>
				{loading ? "Changing..." : "Change Password"}
			</button>
		</form>
	);
}

export default ChangePassword;
