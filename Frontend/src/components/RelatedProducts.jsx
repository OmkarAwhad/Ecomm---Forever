/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import { ShopDataContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";

function RelatedProducts({ category, subCategory }) {
	const { products } = useContext(ShopDataContext);
	const [relatedProducts, setRelatedProducts] = useState([]);

	const fetchRelatedProducts = () => {
		let prodCopy = [...products];

		prodCopy = prodCopy.filter((item) => item.category === category);
		prodCopy = prodCopy.filter(
			(item) => item.subCategory === subCategory
		);
      setRelatedProducts(prodCopy.slice(0,5))
	};

	useEffect(() => {
		fetchRelatedProducts();
	}, [products]);

	return (
		<div className="flex flex-col gap-4 items-center mt-20 mb-32">
			<div className="text-3xl">
				<Title first={"RELATED"} second={"PRODUCTS"} />
			</div>
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {
               relatedProducts.map((item,index) => (
                  <ProductItem id={item._id} key={index} name={item.name} price={item.price} image={item.image} />
               ))
            }
         </div>
		</div>
	);
}

export default RelatedProducts;
