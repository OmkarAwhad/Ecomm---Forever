/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import Title from "../components/Title";
import ProductInOrder from "../components/ProductInOrder";
import { ShopDataContext } from '../context/ShopContext';

function Orders() {

   const {products, currency} = useContext(ShopDataContext);

   return (
      <div>
         <div className="text-2xl my-10">
            <Title first={"MY"} second={"ORDERS"} />
            <hr />
         </div>
         <div>
            {
               products.slice(1,4).map((item,index) => (
                  <ProductInOrder key={index} prodData={item} />
               ))
            }
         </div>
      </div>
   )
}

export default Orders