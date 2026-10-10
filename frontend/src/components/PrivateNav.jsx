import React from 'react'
import { NavLink } from 'react-router-dom'

const PrivateNav = () => {
  return (
    <div className=" flex justify-between gap-2 fixed top-0 left-0 w-full h-[9vh] z-50 px-5 py-3 bg-gray-300 backdrop-blur-sm">
        <p className='text-black poppins-bold text-xl'>AI Youtube Assistant</p>
        <ul className='flex justify-evenly gap-20 text-black poppins-light text-lg px-2'>
        <NavLink
          to="/upload"
          className={({ isActive }) =>
            `relative text-black transition-all duration-300
            ${isActive ? 'text-orange-400 poppins-bold border-2 pb-1 border-white  rounded-sm px-2' : 'text-black'}`
          }
        >
          Upload
        </NavLink>
        
        <button className='bg-[#FF0033] text-white font-bold px-2.5 pb-1 rounded-md active:scale-110'>
            Logout
        </button>
        </ul>
    </div>
  )
}

export default PrivateNav
