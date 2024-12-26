/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { ShopDataContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

function ProductItem({ id, images, name, price }) {
	const { currency } = useContext(ShopDataContext);

	return (
		<Link className="text-gray-700 cursor-pointer " to={`/product/${id}`}>
			<div className="overflow-hidden ">
				{images && images.length > 0 ? (
					<img
						src={images[0]}
						alt="Product_Image"
						className="hover:scale-110 object-cover transition-all duration-200 "
					/>
				) : (
					<div className="h-48 w-full bg-gray-200 flex items-center justify-center">
						<p>No Image Available</p>
					</div>
				)}
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
