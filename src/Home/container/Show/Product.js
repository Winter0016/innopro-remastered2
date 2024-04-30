import React, { useRef } from 'react';
import images from '../../../images/images';
import { useAuth } from '../../../context/shopContext';
export const Product = (props) => {
    const { name, price, id,hotsales} = props.data;
    const {addToCart} = useAuth();
    const {cartItems} = useAuth();
    const {cartposition} = useAuth();


    const productimgposRef = useRef(null);


    let productnumber;

    // Replace spaces with underscores to match the image keys
    const imageName = name.replace(/\s+/g,'');

    //console.log(`${name}'s id is : ${typeof id}`);
    const currentDate = new Date();

// Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
const dayOfWeekIndex = currentDate.getDay();

// Convert day index to your desired format (2, 4, 5, 6, 7, 8)
let dayOfWeek;
let checking;
switch (dayOfWeekIndex) {
    case 0:
        dayOfWeek = 8;
        break;
    case 1:
        dayOfWeek = 2;
        break;
    case 2:
        dayOfWeek = 3;
        break;
    case 3:
        dayOfWeek = 4;
        break;
    case 4:
        dayOfWeek = 5;
        break;
    case 5:
        dayOfWeek = 6;
        break;
    case 6:
        dayOfWeek = 7;
        break;
    default:
        dayOfWeek = '';
}
// console.log(`day of week ${dayOfWeek}`);
// console.log(`hotsales: ${hotsales.split("-")}`)
let salesarray = hotsales.split("-").map(Number);
// console.log(`salesarray : ${salesarray}`);
const checkdate = () =>{
    for(var i = 0 ; i < salesarray.length ; i++){
        if(salesarray[i] ===dayOfWeek){
            return true;
        }
    }
    return false;
}

for(var key in cartItems){
    // console.log(`type of key: ${typeof(key)}`)
    // console.log(`type of id : ${typeof(id)}`)
    if(id == key){
        productnumber= cartItems[key];
    }
}
// console.log(`cartItems: ${JSON.stringify(cartItems)}`)
// console.log(`productnumber : ${productnumber}`);

checking = checkdate();
// console.log(`checking : ${checking}`);
// console.log(JSON.stringify(cartItems));
// console.log(`cartpositon :${cartposition}`);
// console.log(`productimgpos : ${productimgpos}`);
    const addanimation = () => {
        const rect2 = cartposition.getBoundingClientRect();
        const rect1 = productimgposRef.current.getBoundingClientRect();
        const deltaX = rect2.left - rect1.left;
        const deltaY = rect2.top - rect1.top;
        productimgposRef.current.style.zIndex = "300"; 
        productimgposRef.current.style.transition = "transform 1.5s ease";
        productimgposRef.current.style.transform = `translate(${deltaX + 150}px, ${deltaY}px)`;
        // productimgposRef.current.style.opacity = "1";
        productimgposRef.current.classList.add("product-animated")
        // Add event listener to reset animation after transition ends
        productimgposRef.current.addEventListener('transitionend', () => {
            productimgposRef.current.style.zIndex = "-1"; 
            productimgposRef.current.style.transition = "none";
            productimgposRef.current.style.transform = "translate(0, 0)";
            productimgposRef.current.style.opacity = "0";
            productimgposRef.current.classList.remove("product-animated")
        });
    };

    
    return (
        <>
            {
                checking ? (
                    <>

                    </>
                ):(
                    <div className="productx">
                        <div className='productx-container1'>
                            <div className="productx-details">
                                <div>Nguyên Liệu: </div>
                                <div>Hạn sử dụng: 30 ngày</div>
                                <div>Số lượng trong kho: </div>
                                <div>Hot Sale: Thứ {hotsales} </div>
                            </div>
                            <div className='relative'>
                                <img className='productx-imga' src={images[imageName]} alt={name} />
                                <img className='productx-imga2' src={images[imageName]} alt={name} ref={productimgposRef} />
                            </div>
                        </div>
                        <div className="productx-info">
                            <span id='productx-fontfamily' className=" font-semibold text-3xl text-gray-700">{name}</span>
                            <span id='productx-fontfamily' className=' font-light text-3xl text-gray-700'>
                                {productnumber ? `(${productnumber})` : `(0)`}
                            </span><br/>
                            <span className=" font-bold text-xl text-red-800">Khối lượng: 1kg</span><br/>
                            <span className="lg:text-2xl sm:text-2xl md:text-lg text-red-800 font-semibold">Giá : {price.toLocaleString("en-US")} VND</span> <br/>
                            <div className=' flex justify-center w-full mt-2'>
                                <div onClick={() => {addToCart(id);addanimation()}} className="flex items-center justify-center p-3 text-base font-extrabold text-center text-yellow-600 border-2 rounded-lg  focus:ring-4 focus:ring-primary-300 hover:cursor-pointer hover:bg-green-100">
                                    Thêm vào giỏ
                                    <svg className="w-5 h-5 ml-2 -mr-1" data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
};
