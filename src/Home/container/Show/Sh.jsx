import React, { useState } from "react";
import { Product } from "./Product";
import { Salelist } from "./Salelist";
import { useEffect } from "react";
import { useAuth } from "../../../context/shopContext";
import { auth } from "../../../myfirebase/firebase-config";

export const Show = () => {
  const {productlist} = useAuth();
  const {salelist} = useAuth();
  const {loadingpage} = useAuth();
  // console.log(JSON.stringify(productlist));

  useEffect(() => {
    if(window.innerWidth <= 768){
      const observer3 = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          entry.target.classList.add("showslide");
          entry.target.classList.remove("hiddenslide");
        });
      });
  
      const hiddenElements = document.querySelectorAll(".hiddenslide");
      hiddenElements.forEach(el => observer3.observe(el));

      const observer4 = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          entry.target.classList.add("showslide2");
          entry.target.classList.remove("hiddenslide2");
        });
      });
  
      const hiddenElements2 = document.querySelectorAll(".hiddenslide2");
      hiddenElements2.forEach(el => observer4.observe(el));
    }else if (window.innerWidth > 768){
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("showslide");
          } else {
            entry.target.classList.remove("showslide");
          }
        });
      });
  
      const hiddenElements = document.querySelectorAll(".hiddenslide");
      hiddenElements.forEach(el => observer.observe(el));
  
      const observer2 = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("showslide2");
          } else {
            entry.target.classList.remove("showslide2");
          }
        });
      });
  
      const hiddenElements2 = document.querySelectorAll(".hiddenslide2");
      hiddenElements2.forEach(el => observer2.observe(el));

      // Clean up IntersectionObserver instances
      return () => {
        hiddenElements.forEach(el => observer.unobserve(el));
        hiddenElements2.forEach(el => observer2.unobserve(el));
      };
    }
  }, [loadingpage]);

    
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
              <div className="product-show-container z-10">
                <section className="hiddenslide relative">
                  <div className="product-show-hero overflow-hidden relative">
                    <div className="marquee-content">
                      <div className="md:text-2xl lg:text-2xl text-1xl">Hello { auth?.currentUser?.email ? auth.currentUser.displayName || auth.currentUser.email : ``},</div>
                      <div className="md:text-6xl lg:text-6xl text-3xl">WELCOME BACK!</div>
                      <div id="word-fire" className="text-3xl flex gap-1 w-fit rounded-lg p-2 bg-yellow-300">
                        Let's go shopping
                        <svg className="mt-1 fill-red-700" width="24" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.99998 9C11.8752 5.5 11.3921 3.5 11.3921 2C17 6 14.8333 10.5 13.5 12.5C15.1 12.1 18 10 18.5 9C23.5 16.5 17.8921 21.1667 14.8921 22C12.4921 21.6 10.5588 18.1667 9.89211 16.5C8.69211 19.3 9.05878 21.3333 9.39211 22C2.62477 19 2.12475 12.5 6.99998 9Z" stroke="rgba(0,0,0,0.95)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>                
                      </div>
                    </div>
                  </div>                
                </section>
                <section className="hiddenslide relative">
                  <div className="product-show relative">
                    { 
                      productlist.map((product) => (
                          <Product key={product.id} data={product} />
                      ))
                    }
                  </div>   
                </section>
              </div>
              <div className="top-sell-container">
                <section className="hiddenslide2 relative">
                  <div id="top-sell-hero">
                    <div id="hot-sale">HOT SALE 30%</div>
                    <svg id="arrow-down" width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3V21M12 21L5 14M12 21L19 14" stroke="rgba(0,0,0,0.95)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                  </div>
                </section>
                <section className="hiddenslide2 relative">
                  <div className="sell-show-container">
                    { 
                      salelist.map((product) => (
                          <Salelist key={product.id} data={product} />
                      ))
                    }
                  </div>
                </section>
              </div>     
            </div>
          )
        }
      </section>
  )
}
