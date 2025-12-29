import React from 'react'
import loader from '../assets/qnAnimation.webp'

const Preloader = () => {
  return (
    <>
    <div className='w-full h-screen flex justify-center items-center'>
        <div className='md:grid grid-cols-3'>
            <div></div>
            <div>
                <img src={loader} alt="loading" />
            </div>
            <div></div>
        </div>
    </div>
    </>
  )
}

export default Preloader