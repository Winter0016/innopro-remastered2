import React, { useEffect, useRef } from 'react';
import images from '../../../images/images';
import $ from 'jquery';
import 'slick-carousel/slick/slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const Title = () => {
    const sliderRef = useRef(null);

    useEffect(() => {
        if (sliderRef) {
            $(sliderRef.current).slick({
                dots: true,
                arrows: true,
                autoplay: true,
                slidesToShow: 3,
                slidesToScroll: 1,
                lazyLoad: 'ondemand', // Lazy load images
                autoplaySpeed: 1500,
                mobileFirst: true,
                focusOnSelect: true,
                dotsClass: 'slick-dots', // Custom class for dots container
                useCSS:true,
            });
        }
    }, []);

    return (
        <div className="myslideshow-container">
            <div className='slideshow-container' ref={sliderRef}>
                <img className='slideshow-img' data-lazy={images.ChàBông} alt="Lazy loaded image" />
                <img className='slideshow-img' data-lazy={images.ChảChiên} alt="Lazy loaded image" />
                <img className='slideshow-img' data-lazy={images.ChảHoa} alt="Lazy loaded image" />
                <img className='slideshow-img' data-lazy={images.ChảLụa} alt="Lazy loaded image" />
                <img className='slideshow-img' data-lazy={images.ChảQuế} alt="Lazy loaded image" />
            </div>
        </div>
    );
};
