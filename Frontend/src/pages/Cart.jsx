/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { ShopDataContext } from "../context/ShopContext";
import ProductInCart from "../components/ProductInCart";
import CartTotal from "../components/CartTotal";

function Cart() {
   const { products, cartItems, navigate } = useContext(ShopDataContext);

   const [cartData, setCartData] = useState([]);

   useEffect(() => {
      const tempData = [];
      for (const items in cartItems) {
         for (const item in cartItems[items]) {
            if (cartItems[items][item] > 0) {
               tempData.push({
                  _id: items,
                  size: item,
                  quantity: cartItems[items][item],
               });
            }
         }
      }
      // console.log(tempData);
      setCartData(tempData);
   }, [cartItems]);

   return (
      <div>
         <div className="text-2xl">
            <Title first={"YOUR"} second={"CART"} />
            <hr />
         </div>
         <div className="w-full">
            {cartData.map((item, index) => {
               const prodData = products.find(
                  (prod) => prod._id === item._id
               );
               return (
                  <ProductInCart
                     key={index}
                     prodData={prodData}
                     cartData={item}
                  />
               );
            })}
         </div>
         <div className=" flex justify-end my-20 ">
            <div className=" w-full sm:w-[450px] ">
               <CartTotal />
               <div className="w-full text-end">
                  <button onClick={()=>navigate('/place-order')} className="px-4 py-2 w-fit bg-black text-white text-sm my-8 ">
                     PROCEED TO CHECKOUT
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Cart;
