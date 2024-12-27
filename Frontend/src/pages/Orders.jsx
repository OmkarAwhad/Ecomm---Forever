/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import Title from "../components/Title";
import ProductInOrder from "../components/ProductInOrder";
import { ShopDataContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

function Orders() {

   const {backendUrl,token, currency} = useContext(ShopDataContext);

   const [orderData, setOrderData] = useState([]);

   const getOrderData = async () => {
      try {
         if(!token){
            return null
         }
         const response = await axios.post(backendUrl+'/order/userorders', {},{headers:{token}})
         // console.log(response.data.response)
         let allOrders = [];
         response.data.response.map((order) => (
            order.items.map((item,index) => {
               item['status'] = order.status;
               item['payment'] = order.payment;
               item['paymentMethod'] = order.paymentMethod;
               item['date'] = order.date
               allOrders.push(item)
            })
         ))
         allOrders.forEach((item, index) => {
            console.log(`Item ${index + 1}:`, item);
         });
         setOrderData(allOrders.reverse())
      } catch (error) {
         console.log(error)
         toast.error(error.message)
      }
   }

   useEffect(()=>{
      getOrderData()
   },[token])

   return (
      <div className='w-full'>
         <div className="text-2xl my-10 flex items-center justify-center">
            <Title first={"MY"} second={"ORDERS"} />
            <hr />
         </div>
         <div>
            {
               orderData.map((item,index) => (
                  <ProductInOrder key={index} prodData={item} getOrderData={getOrderData} />
               ))
            }
         </div>
      </div>
   )
}

export default Orders