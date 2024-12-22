/* eslint-disable no-unused-vars */
import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsLetterBox from "../components/NewsLetterBox";

function Contact() {
   return (
      <div className='w-full h-full'>
         <div className='text-2xl flex items-center justify-center my-8'>
            <Title first={'CONTACT'} second={'US'} />
         </div>
         <div className='flex flex-col mx-20 lg:flex-row items-center gap-10 '>
            <img src={assets.contact_img} className='w-[590px]' alt="" />
            <div className='flex flex-col gap-7 text-gray-600'>
               <p className='font-bold text-gray-600'>OUT STORE</p>
               <div>
                  <p>54709 Willms Station </p>
                  <p>Suite 350, Washington, USA</p>
               </div>
               <div>
                  <p>Tel: (415) 555‑0132</p>
                  <p>Email: xyz@gmail.com</p>
               </div>
               <h1 className='font-bold text-gray-600'>CAREERS AT FOREVER</h1>
               <p>Learn more about our teams and job openings.</p>
               <button className='px-10 py-6 border-2 w-fit'>Explore Jobs</button>
            </div>
         </div>
         <div className="h-[400px] p-40 ">
            <NewsLetterBox />
         </div>
      </div>
   )
}

export default Contact