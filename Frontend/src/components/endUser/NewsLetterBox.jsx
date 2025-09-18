import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ShopDataContext } from "../../context/ShopContext";

function NewsLetterBox() {
	const { backendUrl,token } = useContext(ShopDataContext);
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		if (loading) return;
		setLoading(true);

		try {
			const response = await axios.post(
				`${backendUrl}/mail/newsLetterBox`,
				{
					email,
				},
				{ headers: { Authorization: `Bearer ${token}` } }
			);

			if (response.data?.success) {
				toast.success(
					response.data.message ||
						"Subscribed successfully! Check your email for the 20% discount code."
				);
				setEmail("");
			} else {
				toast.error(
					response.data?.message || "Subscription failed"
				);
			}
		} catch (error) {
			console.error("Newsletter subscription error", error);
			toast.error(
				error?.response?.data?.message ||
					error.message ||
					"Subscription failed. Please try again."
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="text-center">
			<p className="text-2xl font-medium text-gray-800">
				Subscribe now & get 20% off
			</p>
			<p className="text-gray-400 mt-3">
				Join our newsletter to receive the latest updates, exclusive
				offers, and more delivered straight to your inbox.
			</p>

			<form
				onSubmit={onSubmitHandler}
				className="flex w-full sm:w-1/2 items-center mx-auto my-5 gap-3 border pl-3"
			>
				<input
					type="email"
					placeholder="Enter your email"
					className="w-full sm:flex outline-none py-2"
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					disabled={loading}
				/>
				<button
					type="submit"
					className={`text-white text-xs py-4 px-6 sm:px-10 transition-all duration-200 ${
						loading
							? "bg-gray-400 cursor-not-allowed"
							: "bg-black hover:bg-gray-800"
					}`}
					disabled={loading}
				>
					{loading ? "SUBSCRIBING..." : "SUBSCRIBE"}
				</button>
			</form>
		</div>
	);
}

export default NewsLetterBox;
