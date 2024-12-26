/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

function Add({ token }) {
	const [image1, setImage1] = useState(false);
	const [image2, setImage2] = useState(false);
	const [image3, setImage3] = useState(false);
	const [image4, setImage4] = useState(false);

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [category, setCategory] = useState("Men");
	const [subCategory, setSubCategory] = useState("Topwear");
	const [bestSeller, setBestSeller] = useState(false);
	const [sizes, setSizes] = useState([]);

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			const formData = new FormData();

			formData.append("name", name);
			formData.append("description", description);
			formData.append("price", price);
			formData.append("category", category);
			formData.append("subCategory", subCategory);
			formData.append("bestSeller", bestSeller);
			formData.append("sizes", JSON.stringify(sizes));

			image1 && formData.append("image1", image1);
			image2 && formData.append("image2", image2);
			image3 && formData.append("image3", image3);
			image4 && formData.append("image4", image4);

			// for (let [key, value] of formData.entries()) {
			//    console.log(key, value);
			// }

			const response = await axios.post(
				backendUrl + "/product/add",
				formData,
				{
					headers: {
						token,
					},
				}
			);

			if (response.data.success) {
				toast.success(response.data.message);
				setName("");
				setDescription("");
				setPrice("");
				setCategory("Men");
				setSubCategory("Topwear");
				setBestSeller(false);
				setImage1(false);
				setImage2(false);
				setImage3(false);
				setImage4(false);
				setSizes([]);
			} else {
				toast.error(response.data.message);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form
			onSubmit={submitHandler}
			className="flex flex-col w-full items-start "
		>
			<div>
				<p className="mb-2">Upload Image</p>
				<div className="flex gap-2">
					<label htmlFor="image1">
						<img
							className="w-20"
							src={
								!image1
									? assets.upload_area
									: URL.createObjectURL(image1)
							}
							alt=""
						/>
						<input
							onChange={(e) =>
								setImage1(e.target.files[0])
							}
							type="file"
							id="image1"
							hidden
						/>
					</label>
					<label htmlFor="image2">
						<img
							className="w-20"
							src={
								!image2
									? assets.upload_area
									: URL.createObjectURL(image2)
							}
							alt=""
						/>
						<input
							onChange={(e) =>
								setImage2(e.target.files[0])
							}
							type="file"
							id="image2"
							hidden
						/>
					</label>
					<label htmlFor="image3">
						<img
							className="w-20"
							src={
								!image3
									? assets.upload_area
									: URL.createObjectURL(image3)
							}
							alt=""
						/>
						<input
							onChange={(e) =>
								setImage3(e.target.files[0])
							}
							type="file"
							id="image3"
							hidden
						/>
					</label>
					<label htmlFor="image4">
						<img
							className="w-20"
							src={
								!image4
									? assets.upload_area
									: URL.createObjectURL(image4)
							}
							alt=""
						/>
						<input
							onChange={(e) =>
								setImage4(e.target.files[0])
							}
							type="file"
							id="image4"
							hidden
						/>
					</label>
				</div>
			</div>

			<div className=" w-full md:w-1/2 mt-2">
				<p className="my-2">Product name</p>
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="Type here"
					required
					className="px-3 py-2 rounded border border-gray-300 outline-[#c486a5] w-full "
				/>
			</div>

			<div className="w-full md:w-1/2 mr-2">
				<p className="my-2">Product description</p>
				<textarea
					type="text"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					placeholder="Write Content here"
					required
					className="px-3 py-2 rounded border border-gray-300 outline-[#c486a5] w-full "
				/>
			</div>

			<div className="w-full md:w-1/2 md:flex items-center ">
				<div className="w-full">
					<p className="mt-2">Product category</p>
					<select
						onChange={(e) => setCategory(e.target.value)}
						className="px-3 py-2 border w-[90%] md:w-[150px] border-gray-300 rounded outline-[#c486a5] "
					>
						<option value="Men">Men</option>
						<option value="Women">Women</option>
						<option value="Kids">Kids</option>
					</select>
				</div>
				<div className="w-full">
					<p className="mt-2">Sub category</p>
					<select
						onChange={(e) => setSubCategory(e.target.value)}
						className="px-3 py-2 border w-[90%] md:w-[150px] border-gray-300 rounded outline-[#c486a5] "
					>
						<option value="Topwear">Topwear</option>
						<option value="Bottomwear">Bottomwear</option>
						<option value="Winterwear">Winterwear</option>
					</select>
				</div>
				<div className="w-full">
					<p className="mt-2">Product Price</p>
					<input
						type="number"
						placeholder="25"
						required
						value={price}
						onChange={(e) => setPrice(e.target.value)}
						className="px-3 py-2 border w-[90%] md:w-[150px] border-gray-300 rounded outline-[#c486a5]"
					/>
				</div>
			</div>

			<div className="mt-3">
				<h1 className="my-1">Product Sizes</h1>
				<div className="flex items-center gap-3">
					<div
						onClick={() =>
							setSizes((prev) =>
								prev.includes("S")
									? prev.filter(
											(item) => item !== "S"
									  )
									: [...prev, "S"]
							)
						}
						className={`cursor-pointer h-10 w-12  rounded flex items-center justify-center ${
							sizes.includes("S")
								? "bg-[#ffebf5] border-[0.1px] border-[#c486a5]"
								: "bg-gray-200 border"
						} `}
					>
						<p>S</p>
					</div>
					<div
						onClick={() =>
							setSizes((prev) =>
								prev.includes("M")
									? prev.filter(
											(item) => item !== "M"
									  )
									: [...prev, "M"]
							)
						}
						className={`cursor-pointer h-10 w-12  rounded flex items-center justify-center ${
							sizes.includes("M")
								? "bg-[#ffebf5] border-[0.1px] border-[#c486a5]"
								: "bg-gray-200 border"
						} `}
					>
						<p>M</p>
					</div>
					<div
						onClick={() =>
							setSizes((prev) =>
								prev.includes("L")
									? prev.filter(
											(item) => item !== "L"
									  )
									: [...prev, "L"]
							)
						}
						className={`cursor-pointer h-10 w-12  rounded flex items-center justify-center ${
							sizes.includes("L")
								? "bg-[#ffebf5] border-[0.1px] border-[#c486a5]"
								: "bg-gray-200 border"
						} `}
					>
						<p>L</p>
					</div>
					<div
						onClick={() =>
							setSizes((prev) =>
								prev.includes("XL")
									? prev.filter(
											(item) => item !== "XL"
									  )
									: [...prev, "XL"]
							)
						}
						className={`cursor-pointer h-10 w-12  rounded flex items-center justify-center ${
							sizes.includes("XL")
								? "bg-[#ffebf5] border-[0.1px] border-[#c486a5]"
								: "bg-gray-200 border"
						} `}
					>
						<p>XL</p>
					</div>
					<div
						onClick={() =>
							setSizes((prev) =>
								prev.includes("XXL")
									? prev.filter(
											(item) => item !== "XXL"
									  )
									: [...prev, "XXL"]
							)
						}
						className={`cursor-pointer h-10 w-12  rounded flex items-center justify-center ${
							sizes.includes("XXL")
								? "bg-[#ffebf5] border-[0.1px] border-[#c486a5]"
								: "bg-gray-200 border"
						} `}
					>
						<p>XXL</p>
					</div>
				</div>
			</div>

			<label
				onClick={() => setBestSeller(!bestSeller)}
				className="my-4 inline-flex gap-2"
			>
				<input
					type="checkbox"
					checked={bestSeller}
					onChange={() => setBestSeller(!bestSeller)}
					id="bestSeller"
				/>
				<p>Add to bestSeller</p>
			</label>

			<button type="submit" className="px-7 py-3 bg-black text-white">
				ADD
			</button>
		</form>
	);
}

export default Add;
