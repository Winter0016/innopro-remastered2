import React from "react";
import { Product } from "./Product";

import { useAuth } from "../../../context/shopContext";

export const Show = () => {
  const {productlist} = useAuth();

    
  return (
    <section className="container-product-show">
      <div className="product-show">
        {
            productlist.map((product) => (
                <Product data={product} />
            ))
        }
      </div>
    </section>
  )
}
