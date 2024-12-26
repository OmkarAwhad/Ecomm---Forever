/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { ShopDataContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

function Collection() {
	const { products, search, showSearch } = useContext(ShopDataContext);
	const [showFilter, setShowFilter] = useState(false);
	const [filterProducts, setFilterProducts] = useState([]);
	const [category, setCategory] = useState([]);
	const [subCategory, setSubCategory] = useState([]);
	const [sortType, setSortType] = useState("relevant");

	const toggleCatgory = (e) => {
		if (category.includes(e.target.value)) {
			setCategory(category.filter((item) => item !== e.target.value));
		} else {
			setCategory((prev) => [...prev, e.target.value]);
		}
	};
	useEffect(() => {
		console.log("Category ", category);
	}, [category]);

	const toggleSubCategory = (e) => {
		if (subCategory.includes(e.target.value)) {
			setSubCategory(
				subCategory.filter((item) => item !== e.target.value)
			);
		} else {
			setSubCategory((prev) => [...prev, e.target.value]);
		}
	};
	useEffect(() => {
		console.log("Sub Category ", subCategory);
	}, [subCategory]);

	const applyFilter = () => {
		let productsCopy = [...products]; // or can use products.slice()

		if (showSearch && search) {
			productsCopy = productsCopy.filter((item) =>
				item.name.toLowerCase().includes(search.toLowerCase())
			);
		}

		if (category.length > 0) {
			productsCopy = productsCopy.filter((item) =>
				category.includes(item.category)
			);
		}
		if (subCategory.length > 0) {
			productsCopy = productsCopy.filter((item) =>
				subCategory.includes(item.subCategory)
			);
		}
		setFilterProducts(productsCopy);
	};

	useEffect(() => {
		applyFilter();
	}, [category, subCategory, search, showSearch, products]);

	const sortProducts = () => {
		const productsCopy = [...filterProducts];
		switch (sortType) {
			case "low-high":
				setFilterProducts(
					productsCopy.sort((a, b) => a.price - b.price)
				);
				break;
			case "high-low":
				setFilterProducts(
					productsCopy.sort((a, b) => b.price - a.price)
				);
				break;
			default:
				applyFilter();
				break;
		}
	};

	useEffect(() => {
		sortProducts();
	}, [sortType]);

	return (
		<>
			<div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t ">
				{/* Filter */}
				<div className="min-w-60">
					<p
						onClick={() => setShowFilter(!showFilter)}
						className=" my-2 text-xl flex items-center cursor-pointer gap-2 "
					>
						FILTER
						<img
							src={assets.dropdown_icon}
							alt="Dropdown_icon"
							className={` h-4 sm:hidden ml-3 transition-all duration-300 ${
								showFilter ? "-rotate-90" : "rotate-90"
							} `}
						/>
					</p>

					{/* Category filter */}
					<div
						className={` border border-gray-300  pl-5 py-3 mt-6 ${
							showFilter ? "" : "hidden"
						} sm:block `}
					>
						<p className="mb-3 text-sm font-medium ">
							CATEGORY
						</p>
						<div className="flex flex-col gap-2 text-sm font-light text-gray-700 ">
							<label className="flex gap-2">
								<input
									type="checkbox"
									className="w-3"
									value={"Men"}
									onChange={toggleCatgory}
									name=""
									id=""
								/>
								Men
							</label>
							<label className="flex gap-2">
								<input
									type="checkbox"
									className="w-3"
									value={"Women"}
									onChange={toggleCatgory}
									name=""
									id=""
								/>
								Women
							</label>
							<label className="flex gap-2">
								<input
									type="checkbox"
									className="w-3"
									value={"Kids"}
									onChange={toggleCatgory}
									name=""
									id=""
								/>
								Kids
							</label>
						</div>
					</div>

					{/* Sub category filter */}
					<div
						className={` border border-gray-300  pl-5 py-3 my-6 ${
							showFilter ? "" : "hidden"
						} sm:block `}
					>
						<p className="mb-3 text-sm font-medium ">TYPE</p>
						<div className="flex flex-col gap-2 text-sm font-light text-gray-700 ">
							<label className="flex gap-2">
								<input
									type="checkbox"
									className="w-3"
									value={"Topwear"}
									onChange={toggleSubCategory}
									name=""
									id=""
								/>
								Topwear
							</label>
							<label className="flex gap-2">
								<input
									type="checkbox"
									className="w-3"
									value={"Bottomwear"}
									onChange={toggleSubCategory}
									name=""
									id=""
								/>
								Bottomwear
							</label>
							<label className="flex gap-2">
								<input
									type="checkbox"
									className="w-3"
									value={"Winterwear"}
									onChange={toggleSubCategory}
									name=""
									id=""
								/>
								Winterwear
							</label>
						</div>
					</div>
				</div>

				{/* Right side */}
				<div className="flex-1">
					{/* Top */}
					<div className="flex justify-between text-base sm:text-2xl mb-4 ">
						<Title first={"ALL"} second={"COLLECTIONS"} />
						<select
							onChange={(e) => setSortType(e.target.value)}
							className="border-2 border-gray-300 px-2 text-sm "
						>
							<option value="relevant">
								Sort by : Relevant
							</option>
							<option value="low-high">
								Sort by : Low to High
							</option>
							<option value="high-low">
								Sort by : High to Low
							</option>
						</select>
					</div>

					{/* Products */}
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 ">
						{filterProducts.map((item, index) => (
							<ProductItem
								key={index}
								id={item._id}
								name={item.name}
								images={item.images}
								price={item.price}
							/>
						))}
					</div>
				</div>
			</div>
		</>
	);
}

export default Collection;
