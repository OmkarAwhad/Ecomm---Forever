import React, { useContext, useEffect } from "react";
import { ShopDataContext } from "../context/ShopContext";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function Verify() {
	const { navigate, token, setCartItems, backendUrl } =
		useContext(ShopDataContext);
	const [searchParams, setSearchParams] = useSearchParams();

	const success = searchParams.get("success");
	const orderId = searchParams.get("orderId");

	const verifyPaymentStripe = async () => {
		try {
			if (!token) {
				return null;
			}

			const response = await axios.post(
				backendUrl + "/order/verifyStripe",
				{ success, orderId },
				{ headers: { token } }
			);
			if (response.data.success) {
				setCartItems({});
				navigate("/orders");
			} else {
				navigate("/cart");
				toast.error(response.data.message);
			}
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	};

	useEffect(() => {
		verifyPaymentStripe();
	}, [token]);

	return <div>Verify</div>;
}

export default Verify;
