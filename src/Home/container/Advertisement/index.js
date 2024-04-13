import React from 'react'
import images from '../../../images/images'
import { useAuth } from '../../../context/shopContext';
import { useEffect } from 'react';
export const Advertisement = () => {
      const handleClick = () => {
        // Scroll to a specific Y position on the page
        window.scrollTo({
          top: 800, // Specify the Y position you want to scroll to
          behavior: 'smooth' // Add smooth scrolling behavior
        });
    
        // Alternatively, if you have a specific element to scroll to
        // const element = document.getElementById('targetElementId');
        // element.scrollIntoView({ behavior: 'smooth' });
      };
    
      const {setspeaktosale} = useAuth();
      useEffect(() => {
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
      }, []);

  return (
    <>
        <section className="ad-custombg">
          <section className='hiddenslide'>
            <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 pt-5">
              <div className="mr-auto place-self-center lg:col-span-7">
                <h1 id='ad-text-custom' className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Chả Lụa<br/> Chà Bông<br/> Chất Lượng</h1>
                <a onClick={() => handleClick()} id='ad-a-custom' className="inline-flex items-center justify-center px-5 py-3 mr-5 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900 hover:cursor-pointer">
                  Get started
                  <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"></path></svg>
                </a>
                <a id='ad-a-custom' className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white border border-gray-300 rounded-lg bg-gray-700 hover:bg-gray-500 hover:cursor-pointer" onClick={() => setspeaktosale(true)}>
                  Speak to Sales
                </a> 
              </div>
              <div id='ad-img-custom' className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                  <img src={images.spring_rolls} alt="mockup"/>
              </div>  
            </div>
          </section>
        </section>
    </>
  )
}
