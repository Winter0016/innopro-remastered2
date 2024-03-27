import React from "react";
import { Product } from "./Product";


import { useAuth } from "../../../context/shopContext";
import { auth } from "../../../myfirebase/firebase-config";

export const Show = () => {
  const {productlist} = useAuth();
  const {loadingpage} = useAuth();
  // console.log(JSON.stringify(productlist));

    
  return (
    <section className="container-product">
      {
        loadingpage ? (
          <>
            <div className="product-loading">
              <div className="tiktok-spinner">
                <div className="ball red"></div>
                <div className="ball blue"></div>
              </div>
            </div>
          </>
        ):(
          <div className="product-container2">
            <div className="product-show-container">
              <div className="product-show-hero">
                <div className="text-2xl">Hello { auth.currentUser.displayName ? auth.currentUser.displayName : ``},</div>
                <div className=" text-6xl">WELCOME BACK!</div>
                <div className="text-3xl flex gap-1 w-fit rounded-lg p-2 bg-yellow-300">
                  Let's go shopping
                  <svg className="mt-1 fill-red-700" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.99998 9C11.8752 5.5 11.3921 3.5 11.3921 2C17 6 14.8333 10.5 13.5 12.5C15.1 12.1 18 10 18.5 9C23.5 16.5 17.8921 21.1667 14.8921 22C12.4921 21.6 10.5588 18.1667 9.89211 16.5C8.69211 19.3 9.05878 21.3333 9.39211 22C2.62477 19 2.12475 12.5 6.99998 9Z" stroke="rgba(0,0,0,0.95)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>                
                </div>
              </div>
              <div className="product-show">
                { 
                  productlist.map((product) => (
                      <Product key={product.id} data={product} />
                  ))
                }
              </div>   
            </div>     
          </div>
        )
      }
    </section>
  )
}
