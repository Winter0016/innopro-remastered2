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
        <section className="ad-container">
          <div className='ad1-container'>
            <h1 className='relative overflow-hidden'> 
              Cửa hàng <br/> Nam Hương
              <img id='firstleaf' className='icon' src={images.threeleaf} alt="3leaf" />
              <img id='secondleaf' className='icon' src={images.threeleaf} alt="3leaf" />
              <img id='thirdleaf' className='icon' src={images.threeleaf} alt="3leaf" />
            </h1>
            <div className=' flex gap-3 justify-center relative z-0'>
              <button onClick={() => handleClick()} className="border hover:scale-95 duration-300 relative group cursor-pointer text-sky-50  overflow-hidden h-16 w-52 rounded-md bg-sky-200 p-2 flex justify-center items-center font-extrabold">
                <div className="absolute right-32 -top-4  group-hover:top-1 group-hover:right-2 z-10 w-40 h-40 rounded-full group-hover:scale-150 duration-500 bg-sky-900"></div>
                <div className="absolute right-2 -top-4  group-hover:top-1 group-hover:right-2 z-10 w-32 h-32 rounded-full group-hover:scale-150  duration-500 bg-sky-800"></div>
                <div className="absolute -right-12 top-4 group-hover:top-1 group-hover:right-2 z-10 w-24 h-24 rounded-full group-hover:scale-150  duration-500 bg-sky-700"></div>
                <div className="absolute right-20 -top-4 group-hover:top-1 group-hover:right-2 z-10 w-16 h-16 rounded-full group-hover:scale-150  duration-500 bg-sky-600"></div>
                <p className="z-10">Get started</p>
              </button>
              <button onClick={() => setspeaktosale(true)} className="cursor-pointer font-semibold overflow-hidden relative z-100 border border-green-500 group px-8 py-2 w-52">
                <span className="relative z-10 text-green-500 group-hover:text-white text-xl duration-500">HOTLINE</span>
                <span className="absolute w-full h-full bg-green-500 -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
                <span className="absolute w-full h-full bg-green-500 -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
              </button>
            </div>
          </div>
          <div className='ad-image'>
            <img className=" w-96" src={images.spring_rolls} alt="" />
          </div>
        </section>
    </>
  )
}
