/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

function List({ token }) {
	const [list, setList] = useState([]);

	const fetchList = async () => {
		try {
			const response = await axios.get(backendUrl + "/product/list", {
				headers: {
					token,
				},
			});
			if (response.data.success) {
				setList(response.data.products);
			} else {
				toast.error(response.data.message);
			}

			// console.log(response.data.products);
		} catch (error) {
			console.log(error);
		}
	};

	const removeProd = async (id) => {
		try {
			const response = await axios.post(
				backendUrl + "/product/remove",
				{ id },
				{
					headers: {
						token,
					},
				}
			);

			if (response.data.success) {
				toast.success(response.data.message);
				await fetchList();
			} else {
				toast.error(response.data.message);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchList();
	}, []);

	return (
		<div>
			<h1>All Products List</h1>
			<div className="flex justify-between w-full text-sm sm:text-base sm:font-medium bg-gray-100 border px-2 sm:px-7 rounded-md py-2 ">
				<p className="w-[10%] ">Image</p>
				<p className="w-[30%] ">Name</p>
				<p className="w-[10%] text-center  ">Category</p>
				<p className="w-[10%] text-center  ">Price</p>
				<p className="w-[20%] text-end  ">Action</p>
			</div>
			<div className="flex flex-col gap-2 my-5 ">
				{list.map((item, index) => (
					<div
						key={index}
						className="flex border-[1.5px] px-2 sm:px-7 py-2 justify-between rounded-lg items-center "
					>
						<div className="w-[10%]">
							<img
								src={item.images[0]}
								className=" h-12 object-cover "
								alt=""
							/>
						</div>
						<p className="w-[30%] text-sm ">{item.name}</p>
						<p className="w-[10%] text-center text-sm">
							{item.category}
						</p>
						<p className="w-[10%] text-center text-sm">
							{currency}
							{item.price}
						</p>
						<p
							onClick={() => removeProd(item._id)}
							className="w-[20%] text-end text-sm"
						>
							X
						</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default List;
