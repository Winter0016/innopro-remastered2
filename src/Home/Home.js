import React from 'react'
import {Advertisement} from './container'
import { Show } from './container'
import { Title } from './container'
export const Home = () => {
  return (
      <div className='Home-container'>
        <div className='Home-background'></div> 
        <Advertisement />
        <Title/>
        <Show/>
      </div>
  )
}

