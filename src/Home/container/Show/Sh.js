import React from "react";
import { Product } from "./Product";

import { useAuth } from "../../../context/shopContext";

export const Show = () => {
  const {productlist} = useAuth();
  const {loadingpage} = useAuth();
  // console.log(JSON.stringify(productlist));

    
  return (
    <section className="container-product-show">
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
          <div className="product-show">
            { 
              productlist.map((product) => (
                  <Product key={product.id} data={product} />
              ))
            }
          </div>
        )
      }
    </section>
  )
}
