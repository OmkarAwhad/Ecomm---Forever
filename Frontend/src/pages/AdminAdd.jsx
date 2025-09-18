import React, { useContext, useState } from "react";
import { assets } from "../assets/admin_assets/assets";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ShopDataContext } from "../context/ShopContext";

function AdminAdd() {
   const [image1, setImage1] = useState(false);
   const [image2, setImage2] = useState(false);
   const [image3, setImage3] = useState(false);
   const [image4, setImage4] = useState(false);

   const { backendUrl, token } = useContext(ShopDataContext);

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

         const response = await axios.post(
            backendUrl + "/product/admin-add",
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
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
         <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-center sm:text-left">
            Add New Product
         </h2>
         
         <form onSubmit={submitHandler} className="space-y-6">
            {/* Image Upload Section */}
            <div className="space-y-3">
               <h3 className="text-base sm:text-lg font-semibold text-gray-700">Product Images</h3>
               <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  {[
                     { image: image1, setImage: setImage1, id: "image1" },
                     { image: image2, setImage: setImage2, id: "image2" },
                     { image: image3, setImage: setImage3, id: "image3" },
                     { image: image4, setImage: setImage4, id: "image4" },
                  ].map((item, index) => (
                     <label key={index} htmlFor={item.id} className="cursor-pointer group">
                        <div className="relative overflow-hidden rounded-lg border-2 border-dashed border-gray-300 hover:border-[#c486a5] transition-colors duration-200">
                           <img
                              className="w-full h-20 sm:h-24 object-cover group-hover:scale-105 transition-transform duration-200"
                              src={
                                 !item.image
                                    ? assets.upload_area
                                    : URL.createObjectURL(item.image)
                              }
                              alt={`Upload ${index + 1}`}
                           />
                        </div>
                        <input
                           onChange={(e) => item.setImage(e.target.files[0])}
                           type="file"
                           id={item.id}
                           hidden
                           accept="image/*"
                        />
                     </label>
                  ))}
               </div>
            </div>

            {/* Product Details */}
            <div className="space-y-4 sm:space-y-6">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                     <label className="text-sm sm:text-base font-medium text-gray-700">Product Name</label>
                     <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter product name"
                        required
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c486a5] focus:border-transparent transition-all duration-200"
                     />
                  </div>

                  <div className="space-y-2">
                     <label className="text-sm sm:text-base font-medium text-gray-700">Product Price</label>
                     <input
                        type="number"
                        placeholder="25"
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c486a5] focus:border-transparent transition-all duration-200"
                     />
                  </div>
               </div>

               <div className="space-y-2">
                  <label className="text-sm sm:text-base font-medium text-gray-700">Product Description</label>
                  <textarea
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}
                     placeholder="Write product description here..."
                     required
                     rows={4}
                     className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c486a5] focus:border-transparent resize-none transition-all duration-200"
                  />
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                     <label className="text-sm sm:text-base font-medium text-gray-700">Category</label>
                     <select
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c486a5] focus:border-transparent transition-all duration-200"
                     >
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Kids">Kids</option>
                     </select>
                  </div>

                  <div className="space-y-2">
                     <label className="text-sm sm:text-base font-medium text-gray-700">Sub Category</label>
                     <select
                        onChange={(e) => setSubCategory(e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c486a5] focus:border-transparent transition-all duration-200"
                     >
                        <option value="Topwear">Topwear</option>
                        <option value="Bottomwear">Bottomwear</option>
                        <option value="Winterwear">Winterwear</option>
                     </select>
                  </div>
               </div>

               {/* Sizes Section */}
               <div className="space-y-3">
                  <h3 className="text-sm sm:text-base font-medium text-gray-700">Available Sizes</h3>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                     {["S", "M", "L", "XL", "XXL"].map((size) => (
                        <div
                           key={size}
                           onClick={() =>
                              setSizes((prev) =>
                                 prev.includes(size)
                                    ? prev.filter((item) => item !== size)
                                    : [...prev, size]
                              )
                           }
                           className={`cursor-pointer h-10 w-12 sm:h-12 sm:w-14 rounded-lg flex items-center justify-center font-medium transition-all duration-200 ${
                              sizes.includes(size)
                                 ? "bg-[#c486a5] text-white shadow-md"
                                 : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                           }`}
                        >
                           {size}
                        </div>
                     ))}
                  </div>
               </div>

               {/* Best Seller Checkbox */}
               <div className="flex items-center space-x-3">
                  <input
                     type="checkbox"
                     checked={bestSeller}
                     onChange={() => setBestSeller(!bestSeller)}
                     id="bestSeller"
                     className="w-4 h-4 sm:w-5 sm:h-5 text-[#c486a5] rounded focus:ring-[#c486a5]"
                  />
                  <label htmlFor="bestSeller" className="text-sm sm:text-base font-medium text-gray-700 cursor-pointer">
                     Add to Best Sellers
                  </label>
               </div>

               {/* Submit Button */}
               <button
                  type="submit"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[#c486a5] hover:bg-[#b17a99] text-white font-semibold rounded-lg transition-all duration-200 active:scale-95 shadow-lg hover:shadow-xl"
               >
                  Add Product
               </button>
            </div>
         </form>
      </div>
   );
}

export default AdminAdd;
