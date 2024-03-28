import React from 'react'
import images from '../../images/images';
import { useState } from 'react';
import { useAuth } from '../../context/shopContext';

export const CartItem2 = (props) => {
    const[closecart,setclosecart] =useState(true);
    const { name,price,id } = props.data;
    const { cartItems, addToCart, removeFromCart, updateCartItemAmount } = useAuth();
    const imageName = name.replace(/\s+/g,''); 

  return (
    <>
        <div className='si-info'>
            <img src={images[imageName]} alt="" />
            <div className='si-info-name'>
                <div>{name}</div>
                <div>{price.toLocaleString("en-US")}</div>
            </div>
            <div className='but-container'>
                <input type="number" value={cartItems[id]} onChange={(e) => updateCartItemAmount(Number(e.target.value), id)} />
                <div className='smallbut-container'>
                    <svg onClick={() => addToCart(id)} className='but2' data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
                    </svg>
                    <svg onClick={() => removeFromCart(id)} className='but2' data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
                    </svg>
                </div>
            </div>
        </div>
    </>
  )
}
