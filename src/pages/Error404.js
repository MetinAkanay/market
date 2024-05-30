import React from 'react'
import {Link} from "react-router-dom"

function Error404() {
  return (
    <div className='flex justify-center text-center'>
        <div>
        <p className='text-red-400 text-5xl'>404</p>
        <p className='text-red-800 text-2xl mt-2'>Page Not Found</p>
          <div className='mt-7'>
            <Link to={"/"} className='bg-blue-600 text-white hover:bg-blue-400 rounded-full p-4 '>Go to Home</Link>
          </div>
        </div>
    </div>
  )
}

export default Error404