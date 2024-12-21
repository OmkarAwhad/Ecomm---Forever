/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

function Title({ first, second }) {
	return (
		<div className=" inline-flex items-center gap-2 mb-3">
			<p className="text-gray-500">
				{first}{" "}
				<span className="text-gray-700 font-medium">{second}</span>
			</p>
			<p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-600 "></p>
		</div>
	);
}

export default Title;
