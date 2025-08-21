import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ShopDataContext } from "../context/ShopContext";
import {
	FiSearch,
	FiFilter,
	FiGrid,
	FiList,
	FiTrash2,
	FiEdit3,
} from "react-icons/fi";
import Modal from "../components/layouts/Modal";

function AdminList() {
	const [list, setList] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [viewMode, setViewMode] = useState("list"); // 'list' or 'grid'
	const { backendUrl, token, currency } = useContext(ShopDataContext);

	// Modal state for deleting a product
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [deleteTarget, setDeleteTarget] = useState(null);

	const fetchList = async () => {
		try {
			setLoading(true);
			const response = await axios.get(backendUrl + "/product/list", {
				headers: { token },
			});
			if (response.data.success) {
				setList(response.data.products);
			} else {
				toast.error(response.data.message);
			}
		} catch (error) {
			console.log(error);
			toast.error("Failed to fetch products");
		} finally {
			setLoading(false);
		}
	};

	// Handle delete button click - opens modal
	const handleDeleteClick = (id, name) => {
		setDeleteTarget({ id, name });
		setShowDeleteModal(true);
	};

	// Handle modal confirmation - performs actual deletion
	const handleDeleteConfirm = async () => {
		if (!deleteTarget) return;

		try {
			const response = await axios.post(
				backendUrl + "/product/remove",
				{ id: deleteTarget.id },
				{ headers: { token } }
			);

			if (response.data.success) {
				toast.success(response.data.message);
				await fetchList();
			} else {
				toast.error(response.data.message);
			}
		} catch (error) {
			console.log(error);
			toast.error("Failed to remove product");
		} finally {
			setShowDeleteModal(false);
			setDeleteTarget(null);
		}
	};

	// Handle modal cancellation
	const handleDeleteCancel = () => {
		setShowDeleteModal(false);
		setDeleteTarget(null);
	};

	useEffect(() => {
		fetchList();
	}, []);

	// Filter products based on search term and category
	const filteredProducts = list.filter((product) => {
		const matchesSearch = product.name
			.toLowerCase()
			.includes(searchTerm.toLowerCase());
		const matchesCategory =
			selectedCategory === "All" ||
			product.category === selectedCategory;
		return matchesSearch && matchesCategory;
	});

	// Get unique categories for filter
	const categories = ["All", ...new Set(list.map((item) => item.category))];

	if (loading) {
		return (
			<div className="bg-white rounded-xl shadow-sm p-6 text-center">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c486a5] mx-auto"></div>
				<p className="mt-4 text-gray-600">Loading products...</p>
			</div>
		);
	}

	return (
		<div className="bg-white rounded-xl shadow-sm h-full flex flex-col">
			{/* Header */}
			<div className="p-4 sm:p-6 pb-0">
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
					<div className="mb-4 sm:mb-0">
						<h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
							Product Management
						</h2>
						<p className="text-sm text-gray-600 mt-1">
							Manage your product inventory
						</p>
					</div>
					<div className="text-sm text-gray-600">
						Total Products:{" "}
						<span className="font-semibold text-[#c486a5]">
							{list.length}
						</span>
					</div>
				</div>

				{/* Search and Filter Bar */}
				<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4">
					{/* Search Input */}
					<div className="relative flex-1">
						<FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
						<input
							type="text"
							placeholder="Search products..."
							value={searchTerm}
							onChange={(e) =>
								setSearchTerm(e.target.value)
							}
							className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c486a5] focus:border-transparent transition-all duration-200"
						/>
					</div>

					{/* Category Filter */}
					<div className="relative">
						<FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
						<select
							value={selectedCategory}
							onChange={(e) =>
								setSelectedCategory(e.target.value)
							}
							className="pl-10 pr-8 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c486a5] focus:border-transparent transition-all duration-200 appearance-none bg-white min-w-[140px]"
						>
							{categories.map((category) => (
								<option key={category} value={category}>
									{category}
								</option>
							))}
						</select>
					</div>

					{/* View Mode Toggle */}
					<div className="flex bg-gray-100 rounded-lg p-1">
						<button
							onClick={() => setViewMode("list")}
							className={`p-2 rounded-md transition-colors ${
								viewMode === "list"
									? "bg-white text-[#c486a5] shadow-sm"
									: "text-gray-600 hover:text-gray-800"
							}`}
						>
							<FiList className="w-4 h-4" />
						</button>
						<button
							onClick={() => setViewMode("grid")}
							className={`p-2 rounded-md transition-colors ${
								viewMode === "grid"
									? "bg-white text-[#c486a5] shadow-sm"
									: "text-gray-600 hover:text-gray-800"
							}`}
						>
							<FiGrid className="w-4 h-4" />
						</button>
					</div>
				</div>
			</div>

			{/* Desktop Table Header - Only for List View */}
			{viewMode === "list" && (
				<div className="hidden lg:block sticky top-0 z-10 bg-white px-4 sm:px-6">
					<div className="flex items-center w-full text-sm font-semibold bg-gray-50 border rounded-lg py-3 px-4">
						<div className="w-[12%]">Image</div>
						<div className="w-[28%]">Product Name</div>
						<div className="w-[15%] text-center">
							Category
						</div>
						<div className="w-[12%] text-center">Price</div>
						<div className="w-[15%] text-center">
							Stock Status
						</div>
						<div className="w-[18%] text-center">Actions</div>
					</div>
				</div>
			)}

			{/* Products Content */}
			<div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-4 sm:pb-6">
				{filteredProducts.length > 0 ? (
					viewMode === "list" ? (
						/* List View */
						<div className="space-y-2 sm:space-y-3 mt-2 sm:mt-4">
							{filteredProducts.map((item, index) => (
								<div
									key={item._id || index}
									className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 hover:shadow-lg hover:border-[#c486a5] transition-all duration-200"
								>
									{/* Mobile/Tablet Layout */}
									<div className="lg:hidden">
										<div className="flex items-start gap-3 sm:gap-4 mb-3">
											<div className="relative">
												<img
													src={
														item
															.images[0]
													}
													className="h-16 w-16 sm:h-20 sm:w-20 object-cover rounded-xl flex-shrink-0"
													alt={item.name}
												/>
											</div>
											<div className="flex-1 min-w-0">
												<h3 className="font-semibold text-gray-800 text-sm sm:text-base mb-1 line-clamp-2">
													{item.name}
												</h3>
												<div className="flex items-center gap-2 mb-2">
													<span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
														{
															item.category
														}
													</span>
													{item.subCategory && (
														<span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
															{
																item.subCategory
															}
														</span>
													)}
												</div>
												<p className="text-lg font-bold text-[#c486a5]">
													{currency}
													{item.price}
												</p>
											</div>
										</div>

										<div className="flex gap-2">
											<button
												onClick={() =>
													handleDeleteClick(
														item._id,
														item.name
													)
												}
												className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-lg text-sm font-medium transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
											>
												<FiTrash2 className="w-4 h-4" />
												Remove
											</button>
										</div>
									</div>

									{/* Desktop Layout */}
									<div className="hidden lg:flex items-center">
										<div className="w-[12%]">
											<div className="relative">
												<img
													src={
														item
															.images[0]
													}
													className="h-14 w-14 object-cover rounded-xl"
													alt={item.name}
												/>
											</div>
										</div>
										<div className="w-[28%] pr-4">
											<h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-1">
												{item.name}
											</h3>
											{item.subCategory && (
												<span className="text-xs text-gray-500">
													{
														item.subCategory
													}
												</span>
											)}
										</div>
										<div className="w-[15%] text-center">
											<span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
												{item.category}
											</span>
										</div>
										<div className="w-[12%] text-center">
											<span className="font-bold text-[#c486a5]">
												{currency}
												{item.price}
											</span>
										</div>
										<div className="w-[15%] text-center">
											<span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
												In Stock
											</span>
										</div>
										<div className="w-[18%] text-center">
											<div className="flex items-center justify-center gap-2">
												<button
													onClick={() =>
														handleDeleteClick(
															item._id,
															item.name
														)
													}
													className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200 active:scale-95"
												>
													<FiTrash2 className="w-4 h-4" />
												</button>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					) : (
						/* Grid View */
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mt-4">
							{filteredProducts.map((item, index) => (
								<div
									key={item._id || index}
									className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg hover:border-[#c486a5] transition-all duration-200"
								>
									<div className="relative mb-4">
										<img
											src={item.images[0]}
											className="w-full h-48 object-cover rounded-lg"
											alt={item.name}
										/>
										<div className="absolute top-2 left-2">
											<span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
												{item.category}
											</span>
										</div>
									</div>

									<div className="space-y-3">
										<div>
											<h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-2">
												{item.name}
											</h3>
											{item.subCategory && (
												<p className="text-xs text-gray-500">
													{
														item.subCategory
													}
												</p>
											)}
										</div>

										<div className="flex items-center justify-between">
											<span className="text-lg font-bold text-[#c486a5]">
												{currency}
												{item.price}
											</span>
											<span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
												In Stock
											</span>
										</div>

										<div className="flex gap-2">
											<button
												onClick={() =>
													handleDeleteClick(
														item._id,
														item.name
													)
												}
												className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-medium transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
											>
												<FiTrash2 className="w-4 h-4" />
												Delete
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
					)
				) : (
					/* Empty State */
					<div className="text-center py-12">
						<div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
							<svg
								className="w-12 h-12 text-gray-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
								/>
							</svg>
						</div>
						<h3 className="text-lg font-semibold text-gray-800 mb-2">
							{searchTerm || selectedCategory !== "All"
								? "No products match your search"
								: "No products found"}
						</h3>
						<p className="text-gray-600 mb-4">
							{searchTerm || selectedCategory !== "All"
								? "Try adjusting your search terms or filters"
								: "Start by adding some products to your inventory"}
						</p>
						{(searchTerm || selectedCategory !== "All") && (
							<button
								onClick={() => {
									setSearchTerm("");
									setSelectedCategory("All");
								}}
								className="px-4 py-2 bg-[#c486a5] text-white rounded-lg hover:bg-[#b17a99] transition-colors"
							>
								Clear Filters
							</button>
						)}
					</div>
				)}
			</div>

			{/* Footer with Statistics */}
			{filteredProducts.length > 0 && (
				<div className="border-t border-gray-200 px-4 sm:px-6 py-3">
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-600">
						<div>
							Showing {filteredProducts.length} of{" "}
							{list.length} products
						</div>
						{(searchTerm || selectedCategory !== "All") && (
							<button
								onClick={() => {
									setSearchTerm("");
									setSelectedCategory("All");
								}}
								className="mt-2 sm:mt-0 text-[#c486a5] hover:text-[#b17a99] font-medium"
							>
								Clear all filters
							</button>
						)}
					</div>
				</div>
			)}

			{showDeleteModal && (
				<Modal
					title="Delete Product"
					description={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
					btn1={{
						text: "Delete",
						onClick: handleDeleteConfirm,
					}}
					btn2={{
						text: "Cancel",
						onClick: handleDeleteCancel,
					}}
				/>
			)}
		</div>
	);
}

export default AdminList;
