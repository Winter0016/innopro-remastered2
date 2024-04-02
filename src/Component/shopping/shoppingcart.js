import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/shopContext.js';
import { auth } from '../../myfirebase/firebase-config.js';
import images from "../../images/images.js";
import { CartItem } from './cart-item.js';
import { CartItem2 } from './cart-item2.js';


export const Cart = () => {
    const { userLoggedIn } = useAuth();
    const[closecart,setclosecart] =useState(true);
    const {productlist} = useAuth();
    const {salelist} = useAuth();
    const { cartItems} = useAuth();
    const {totalAmount} = useAuth();
    const {totalproductnumber} = useAuth();
    // console.log(`total at shop : ${totalAmount}`);
    // console.log(`cart items at shop : ${JSON.stringify(cartItems)}`);
    const navigate = useNavigate();

  return (
    
    <>
          <section className="fixed right-0 h-full z-50">
            <div className="sidecart2">
              <div className='si-item'>
                <div className="si-icon-container">
                  <div className="productnumber">
                    {totalproductnumber}
                  </div>
                  <svg className="si-icon"data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"></path>
                  </svg>
                </div>
                <div className='si-item-text'>Cart</div>
              </div> 
              <div className="si-container">
                {productlist.map((product)=>{
                  if(cartItems[product.id]!==0 && cartItems[product.id] !== undefined){
                    return <CartItem data={product} />
                  }
                })}
                {salelist.map((product)=>{
                  if(cartItems[product.id]!==0 && cartItems[product.id] !== undefined){
                    return <CartItem data={product} />
                  }
                })}
              </div>
              {
                totalAmount > 0 ? (
                  <div className=' finish-container'>
                    <div className='bg-green-500 rounded-lg mb-2 si-info-name'> Total: {totalAmount.toLocaleString("en-US")}</div>
                    <div onClick={() => navigate("/checkout")} className=" bg-red-500 rounded-2xl w-64 m-auto goto-checkout hover:cursor-pointer hover:bg-yellow-400 hover:scale-125 si-info-name"> Checkout </div>
                  </div>
                ):(
                  <h1 className='text-black absolute text-center w-full text-6xl top-32 pr-14'> Your Cart is empty </h1>
                )
              }
            </div>
            {
              closecart ? ( 
                <div className="si-icon-container">
                  <div className="productnumber2">
                    {totalproductnumber}
                  </div>
                  <svg onClick={() => setclosecart(false)} className="si-icon2"data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"></path>
                  </svg>
                </div>
              ):(
                <div className="sidecart">
                  <svg onClick={() => setclosecart (true)} className="si-xclose absolute top-0 left-0 " data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
                  </svg>
                  <div className='si-item'>
                    <div className="si-icon-container">
                      <div className="productnumber">
                        {totalproductnumber}
                      </div>
                      <svg className="si-icon"data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"></path>
                      </svg>
                    </div>
                    <div className='si-item-text'>Cart</div>
                  </div>
                  <div className="si-container">
                    {productlist.map((product)=>{
                      if(cartItems[product.id]!==0 && cartItems[product.id] !== undefined){
                        return <CartItem2 data={product} />
                      }
                    })}
                    {salelist.map((product)=>{
                      if(cartItems[product.id]!==0 && cartItems[product.id] !== undefined){
                        return <CartItem2 data={product} />
                      }
                    })}                  
                  </div>
                  {
                    totalAmount > 0 ? (
                      <div className=' finish-container'>
                        <div className='bg-green-500 rounded-lg mb-2 si-info-name'> Total: {totalAmount.toLocaleString("en-US")}</div>
                        <div onClick={() => {navigate("/checkout") ; setclosecart(true)}} className=" bg-red-500 rounded-2xl w-64 m-auto goto-checkout hover:cursor-pointer hover:bg-yellow-400 hover:scale-125 si-info-name"> Checkout </div>
                      </div>
                    ):(
                      <>
                        <h1 className=' text-black absolute text-center w-full text-5xl pr-14 top-32'>Your Cart is empty</h1>
                      </>
                    )
                  } 
                </div>
              )
            }
          </section>    
    </>
  )
}
