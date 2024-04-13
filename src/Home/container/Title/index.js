import React, { useEffect, useState } from 'react';
import images from '../../../images/images';
import { useAuth } from '../../../context/shopContext';

export const Title = () => {
    const { productlist } = useAuth();

    const [reloadedpage, settoreloadedpage] = useState(true);
    const [clearintervalid,setclearintervalid]= useState(false);

    let myslides;
    let mydot;
    let index = 1;
    let intervalId;

    useEffect(() => {
        const myfunction = async () => {
            try {
                myslides = await document.querySelectorAll(".slideshow-img");
                mydot = await document.querySelectorAll(".dot");
                if (await reloadedpage) {
                    myslides[0].classList.replace("slideshow-img", "slideshow-img-active");
                    mydot[0].classList.add("active")
                    await settoreloadedpage(false);
                }
            } catch (error) {
                console.log(error);
            }
        }
        myfunction();
    }, []);

    const slidefunction = () => {
        if (myslides && mydot) {
            if (index >= myslides.length) {
                index = 0;
            }
            for (let i = 0; i < myslides.length; i++) {
                myslides[i].classList.replace("slideshow-img-active", "slideshow-img"); // Remove "active" class from all dots
            }
            for (let i = 0; i < mydot.length; i++) {
                mydot[i].classList.remove("active");
            }
            mydot[index].classList.add("active");
            myslides[index].classList.replace("slideshow-img", "slideshow-img-active");
            index++;
        }
    }
    const slidefunction2 = async (newindex) => {
        myslides = await document.querySelectorAll("#damnslide2");
        mydot = await document.querySelectorAll("#dot2");
        for (let i = 0; i < myslides.length; i++) {
            myslides[i].classList.replace("slideshow-img-active", "slideshow-img"); // Remove "active" class from all dots
        }
        for (let i = 0; i < mydot.length; i++) {
            mydot[i].classList.remove("active")
            mydot[i].style.backgroundColor = "#bbb";
        }
        mydot[newindex].style.backgroundColor = "#000000";
        myslides[newindex].classList.replace("slideshow-img", "slideshow-img-active")
    }

    useEffect(() =>{
        if(!clearintervalid){
            intervalId = setInterval(slidefunction, 3000);
        }
        else{
            clearInterval(intervalId);
        }
        return () => clearInterval(intervalId);
    },[clearintervalid]);
    const onclickdot = (e) => {
        setclearintervalid(true);
        slidefunction2(parseInt(e.target.innerText));
    }
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
        <div className="myslideshow-container">
            <section className='hiddenslide'>
                <div className="slideshow-container">
                    <img id='damnslide2' className='slideshow-img' src={images.ChàBông} alt="chabong" />
                    <img id='damnslide2' className='slideshow-img' src={images.ChảLụa} alt="" />
                    <img id='damnslide2' className='slideshow-img' src={images.ChảChiên} alt="" />
                    <div className="flex justify-center">
                        <span id='dot2' className="dot">
                            <p onClick={(e) => onclickdot(e)}>0</p>
                        </span>
                        <span id='dot2' className="dot">
                            <p onClick={(e) => onclickdot(e)}>1</p>
                        </span>
                        <span id='dot2' className="dot">
                            <p onClick={(e) => onclickdot(e)}>2</p>
                        </span>
                    </div>
                </div>
            </section>
        </div>
    );
};
