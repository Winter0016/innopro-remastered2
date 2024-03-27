import React from "react";
import { Product } from "./Product";

import { useAuth } from "../../../context/shopContext";

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
                <div>hello Nguyen,</div>
                <div>WELCOME BACK</div>
                <div>Let's go shopping!</div>
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
