import React, { useContext, useEffect, useState } from "react";
import { ShopDataContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/endUser/Title";
import ProductItem from "../components/endUser/ProductItem";
import SearchBar from "../components/endUser/SearchBar";

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

	const toggleSubCategory = (e) => {
		if (subCategory.includes(e.target.value)) {
			setSubCategory(
				subCategory.filter((item) => item !== e.target.value)
			);
		} else {
			setSubCategory((prev) => [...prev, e.target.value]);
		}
	};

	const applyFilter = () => {
		let productsCopy = [...products];

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

	useEffect(() => {
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
	}, [sortType]);

	return (
		<>
			<div className="pt-10 border-t">
				<div className="grid grid-cols-1 md:grid-cols-[15rem_1fr] gap-1 sm:gap-10">
					<aside className="md:sticky md:top-24 md:self-start">
						<SearchBar />

						<div className="mt-7 md:mt-10">
							<p
								onClick={() => setShowFilter((v) => !v)}
								className="my-2 text-xl flex items-center cursor-pointer gap-2 md:cursor-default"
							>
								FILTER
								<img
									src={assets.dropdown_icon}
									alt="Dropdown_icon"
									className={`h-4 ml-3 transition-all duration-300 md:hidden ${
										showFilter
											? "-rotate-90"
											: "rotate-90"
									}`}
								/>
							</p>

							<div
								className={`border border-gray-300 pl-5 py-3 mt-6 ${
									showFilter ? "block" : "hidden"
								} md:block`}
							>
								<p className="mb-3 text-sm font-medium">
									CATEGORY
								</p>
								<div className="flex flex-col gap-2 text-sm font-light text-gray-700">
									<label className="flex gap-2 items-center">
										<input
											type="checkbox"
											className="w-3"
											value="Men"
											onChange={toggleCatgory}
											checked={category.includes(
												"Men"
											)}
										/>
										<span>Men</span>
									</label>
									<label className="flex gap-2 items-center">
										<input
											type="checkbox"
											className="w-3"
											value="Women"
											onChange={toggleCatgory}
											checked={category.includes(
												"Women"
											)}
										/>
										<span>Women</span>
									</label>
									<label className="flex gap-2 items-center">
										<input
											type="checkbox"
											className="w-3"
											value="Kids"
											onChange={toggleCatgory}
											checked={category.includes(
												"Kids"
											)}
										/>
										<span>Kids</span>
									</label>
								</div>
							</div>

							<div
								className={`border border-gray-300 pl-5 py-3 my-6 ${
									showFilter ? "block" : "hidden"
								} md:block`}
							>
								<p className="mb-3 text-sm font-medium">
									TYPE
								</p>
								<div className="flex flex-col gap-2 text-sm font-light text-gray-700">
									<label className="flex gap-2 items-center">
										<input
											type="checkbox"
											className="w-3"
											value="Topwear"
											onChange={
												toggleSubCategory
											}
											checked={subCategory.includes(
												"Topwear"
											)}
										/>
										<span>Topwear</span>
									</label>
									<label className="flex gap-2 items-center">
										<input
											type="checkbox"
											className="w-3"
											value="Bottomwear"
											onChange={
												toggleSubCategory
											}
											checked={subCategory.includes(
												"Bottomwear"
											)}
										/>
										<span>Bottomwear</span>
									</label>
									<label className="flex gap-2 items-center">
										<input
											type="checkbox"
											className="w-3"
											value="Winterwear"
											onChange={
												toggleSubCategory
											}
											checked={subCategory.includes(
												"Winterwear"
											)}
										/>
										<span>Winterwear</span>
									</label>
								</div>
							</div>
						</div>
					</aside>

					<main className="w-full">
						<div className="flex justify-between items-center gap-3 text-base sm:text-2xl mb-4">
							<Title
								first={"ALL"}
								second={"COLLECTIONS"}
							/>
							<select
								onChange={(e) =>
									setSortType(e.target.value)
								}
								className="border-2 border-gray-300 px-2 py-2 text-sm"
								value={sortType}
								aria-label="Sort products"
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

						{filterProducts.length === 0 ? (
							<div className="py-16 text-center text-gray-500">
								<p className="text-lg font-medium">
									No products found
								</p>
								<p className="text-sm mt-2">
									Try adjusting filters or clearing
									the search.
								</p>
								<button
									onClick={() => {
										setCategory([]);
										setSubCategory([]);
										applyFilter();
									}}
									className="mt-4 inline-flex items-center rounded border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50"
								>
									Clear filters
								</button>
							</div>
						) : (
							<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
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
						)}
					</main>
				</div>
			</div>
		</>
	);
}

export default Collection;
