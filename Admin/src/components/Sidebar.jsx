/* eslint-disable no-unused-vars */
import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'

function Sidebar() {
   return (
      <div className='w-[18%] h-[89vh] overflow-y-hidden border-r flex pt-5 flex-col gap-4 '>
         <NavLink to={'/add'} className={` flex items-center gap-3  w-[85%] mx-auto py-2 px-5 rounded-md border-2 `}>
            <img src={assets.add_icon} alt="Add_icon" className='h-5' />
            <p className='hidden md:block'>Add Items</p>
         </NavLink>
         <NavLink to={'/list'} className={` flex items-center gap-3  w-[85%] mx-auto py-2 px-5 rounded-md border-2 `}>
            <img src={assets.order_icon} alt="Order_Icon" className='h-5' />
            <p className='hidden md:block'>List Items</p>
         </NavLink>
         <NavLink to={'/orders'} className={` flex items-center gap-3  w-[85%] mx-auto py-2 px-5 rounded-md border-2 `}>
            <img src={assets.order_icon} alt="Order_Icon" className='h-5' />
            <p className='hidden md:block'>Orders</p>
         </NavLink>
      </div>
   )
}

export default Sidebar
// #ffebf5
// #c486a5