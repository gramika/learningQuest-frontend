import React from 'react'
import { Link } from 'react-router-dom'
import pageNotFound from '../assets/404.gif'

const PageNotFound = () => {
  return (
    <>
       <div className='w-full h-screen flex flex-col justify-center items-center'>
        <div className='md:grid grid-cols-3'>
            <div></div>
            <div className='flex justify-center items-center flex-col p-5 md:p-0'>
              <h1 className='text-center text-2xl font-bold text-teal-800'>The page you are looking for is currently unavailable</h1>
                <img src={pageNotFound} alt="pagenotfound" />
                <Link to={'/'}><button className='text-2xl bg-gray-700 text-white p-3 rounded-full hover:text-gray-700 hover:bg-white hover: border-2 hover:border-gray-900 '>back to home</button></Link>
            </div>
            <div></div>
            </div>
        </div> 
    </>
  )
}

export default PageNotFound