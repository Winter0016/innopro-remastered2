import React,{useRef} from 'react'
import {Advertisement} from './container'
import { Show } from './container'
import { Title } from './container'
import { useAuth } from '../context/shopContext'
import { useState } from 'react'
import images from '../images/images'
export const Home = () => {

  const [closing,setclosing] = useState();
  const {speaktosale,setspeaktosale} = useAuth();
  const myspeak = useRef(null);


  const closecontact = () =>{
    console.log(`myspeak : ${myspeak}`);
    myspeak.current.style.transition = "transform 1.5s ease";
    myspeak.current.style.transform = "translate(0,-100%)";

    myspeak.current.addEventListener('transitionend', () => {
      setspeaktosale(false);
    })
  }

  return (
      <div className='Home-container'>
        <div className='Home-background'></div>
        {
          speaktosale ? (
            <>
                <div className="speaktosale" ref={myspeak} >
                    <div class="mx-auto w-full h-full max-w-screen-xl flex flex-col md:justify-center relative">
                        <div id='x-speaktosale' onClick={() => closecontact()}>
                            <svg width="38" height="38" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 5L19 19M5 19L19 5" stroke="rgba(0,0,0,0.95)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                        </div>
                        <div class="flex flex-wrap gap-40 items-center">
                            <img id='callcenter' src={images.callcenter} alt="" />
                            <div>
                                <h2 class="mb-6 font-semibold text-gray-900 uppercase dark:text-white lg:text-4xl pl-3">Contract</h2>
                                <ul class="text-gray-500 dark:text-gray-400 font-medium md:text-3xl pl-3">
                                    <li class="mb-4">
                                        <a class="hover:underline flex w-10">HOTLINE: 0906970475</a>
                                    </li>
                                    <li class="mb-4">
                                        <a class="hover:underline flex w-10">FACEBOOK: https://www.facebook.com/profile.php?id=100008188838371</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>        
            </>
          ):(
            <>
            
            </>
          )
        }
        <Advertisement />
        <Title/>
        <Show/>
      </div>
  )
}

