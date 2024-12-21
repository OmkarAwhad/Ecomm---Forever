/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopDataContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";
import RelatedProducts from "../components/RelatedProducts";

function Product() {
	const { productId } = useParams();
	// console.log(productId)
	const { products, currency, addToCart } = useContext(ShopDataContext);
	const [productData, setProductData] = useState(null);
	const [image, setImage] = useState("");
	const [size, setSize] = useState("");

	const fetchProductData = async () => {
		products.map((item, index) => {
			if (item._id === productId) {
				setProductData(item);
				// console.log(item);
				setImage(item.image[0]);
				return null;
			}
		});
	};

	useEffect(() => {
		fetchProductData();
	}, [productData, products]);

	return productData ? (
		<div className="border-t-2 pt-10 transition-opacity ease-in opacity-100 duration-500">
			{/* Product data */}
			<div className="flex gap-12 sm:gap-12 flex-col sm:flex-row ">
				{/* Product image */}
				<div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row ">
					<div className=" flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[19%] w-full ">
						{productData.image.map((img, index) => (
							<img
								src={img}
								onClick={() => setImage(img)}
								alt="img"
								key={index}
								className=" w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer "
							/>
						))}
					</div>
					<div className="w-full sm:w-[80%]">
						<img
							src={image}
							className="w-full h-auto"
							alt=""
						/>
					</div>
				</div>

				{/* Product Info */}
				<div className="flex-1">
					<h1 className="font-medium text-2xl mt-2 ">
						{productData.name}
					</h1>
					<div className="flex items-center gap-1 mt-2 ">
						<img
							src={assets.star_icon}
							alt=""
							className="w-3.5"
						/>
						<img
							src={assets.star_icon}
							alt=""
							className="w-3.5"
						/>
						<img
							src={assets.star_icon}
							alt=""
							className="w-3.5"
						/>
						<img
							src={assets.star_icon}
							alt=""
							className="w-3.5"
						/>
						<img
							src={assets.star_dull_icon}
							alt=""
							className="w-3.5"
						/>
						<p className="pl-2">(102)</p>
					</div>
					<p className="my-4 font-medium text-3xl">
						{currency}
						{productData.price}
					</p>
					<p className="text-gray-500 my-6 md:w-4/5 ">
						{productData.description}
					</p>
					<div>
						<p className=" text-gray-600 my-3 font-medium text-xl ">
							Select Size
						</p>
						<div className="flex my-7 gap-5">
							{productData.sizes.map((item, index) => (
								<button
									onClick={() => setSize(item)}
									className={` border w-12 bg-gray-100 h-12 flex items-center justify-center ${
										size === item
											? "border-orange-500"
											: ""
									} `}
									key={index}
								>
									{item}
								</button>
							))}
						</div>
						<button
							onClick={() =>
								addToCart(productData._id, size)
							}
							className=" bg-black text-white px-8 py-3 text-sm active:bg-gray-700 "
						>
							ADD TO CART
						</button>
						<hr className="mt-8 sm:w-4/5 " />
					</div>
					<div className="text-sm text-gray-500 my-3 flex flex-col gap-1">
						<p>100% Original product.</p>
						<p>
							Cash on delivery is available on this
							product.
						</p>
						<p>
							Easy return and exchange policy within 7
							days.
						</p>
					</div>
				</div>
			</div>

			{/* Description and reviews */}
			<div className="mt-20 mb-5">
				<div className="flex ">
					<div className="border border-gray-300 px-7 py-3 text-sm font-medium text-gray-700 ">
						Description
					</div>
					<div className="border border-gray-300 px-7 py-3 text-sm font-medium text-gray-400 bg-gray-100 ">
						Reviews(102)
					</div>
				</div>
				<div className="p-8 text-sm text-gray-500 flex flex-col gap-4 border border-gray-300  ">
					<p>
						An e-commerce website is an online platform that
						facilitates the buying and selling of products or
						services over the internet. It serves as a virtual
						marketplace where businesses and individuals can
						showcase their products, interact with customers,
						and conduct transactions without the need for a
						physical presence. E-commerce websites have gained
						immense popularity due to their convenience,
						accessibility, and the global reach they offer.
					</p>
					<p>
						E-commerce websites typically display products or
						services along with detailed descriptions, images,
						prices, and any available variations (e.g., sizes,
						colors). Each product usually has its own
						dedicated page with relevant information.
					</p>
				</div>
				<hr className="mt-8" />
			</div>

			{/* Related products */}
			<RelatedProducts
				category={productData.category}
				subCategory={productData.subCategory}
			/>
		</div>
	) : (
		<div className="opacity-0 "></div>
	);
}

export default Product;
