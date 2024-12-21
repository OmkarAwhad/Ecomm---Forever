/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { ShopDataContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

function ProductItem({ id, image, name, price }) {
	const { currency } = useContext(ShopDataContext);

	return (
		<Link className="text-gray-700 cursor-pointer " to={`/product/${id}`}>
			<div className="overflow-hidden ">
				<img
					src={image[0]}
					alt="Product_Image"
					className="hover:scale-110 object-cover transition-all duration-200 "
				/>
			</div>
			<p className="pt-3 pb-1 text-sm">{name}</p>
			<p className=" text-sm font-medium ">
				{currency}
				{price}
			</p>
		</Link>
	);
}

export default ProductItem;
