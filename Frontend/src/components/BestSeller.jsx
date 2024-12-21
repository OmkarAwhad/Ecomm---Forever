/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import Title from "./TItle";
import { ShopDataContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";

function BestSeller() {
	const { products } = useContext(ShopDataContext);
	// console.log(products);
	const [bestProducts, setBestProducts] = useState([]);

	useEffect(() => {
		const bestProd = products.filter((elm) => elm.bestseller === true);
		// console.log(bestProd);
		setBestProducts(bestProd.slice(0, 5));
	}, []); // only on first render

	return (
		<div className="my-10">
			<div className="text-center py-8 text-3xl ">
				<Title first={"BEST"} second={"SELLER"} />
				<p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-400 ">
					Lorem ipsum dolor sit amet consectetur adipisicing
					elit. Illo assumenda voluptatem aperiam labore quam.
				</p>
			</div>
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6 gap-4">
				{bestProducts.map((item, index) => (
					<ProductItem
						key={index}
						id={item._id}
						image={item.image}
						name={item.name}
						price={item.price}
					/>
				))}
			</div>
		</div>
	);
}

export default BestSeller;
