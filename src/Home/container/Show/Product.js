import React from 'react';
import images from '../../../images/images';
import { useAuth } from '../../../context/shopContext';
export const Product = (props) => {
    const { name, price, id } = props.data;
    const {addToCart} = useAuth();

    // Replace spaces with underscores to match the image keys
    const imageName = name.replace(/\s+/g,'');

    //console.log(`${name}'s id is : ${typeof id}`);

    return (
        <>
            <div className="productx">
                <img src={images[imageName]} alt={name} />
                <div className="pt-3 pb-3">
                    <span className="font-bold text-3xl text-gray-700">{name}</span> <br/>
                    <span className="lg:text-2xl sm:text-2xl md:text-lg text-red-800">Giá : {price.toLocaleString("en-US")} VND</span> <br/>
                    <div className=' flex justify-center w-full mt-2'>
                        <div onClick={() => addToCart(id)} className="flex items-center justify-center p-3 text-base font-medium text-center text-yellow-600	 border-2 rounded-lg  focus:ring-4 focus:ring-primary-300 hover:cursor-pointer hover:bg-green-100">
                            Thêm vào giỏ
                            <svg className="w-5 h-5 ml-2 -mr-1" data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
