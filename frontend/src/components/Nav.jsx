import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => {
  return (
    <div className=" flex justify-between gap-2 fixed top-0 left-0 w-full h-[9vh] z-50 px-5 py-3.5 bg-white/20 backdrop-blur-sm">
        <p className='text-white poppins-bold text-xl'>AI Youtube Assistant</p>
        <ul className='flex justify-evenly gap-20 text-white poppins-light text-lg px-2'>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `relative  text-white transition-all duration-300 
            ${isActive ? 'text-yellow-300 poppins-bold border-1 border-white  rounded-sm px-2' : 'text-white'}`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            `relative text-white transition-all duration-300
            ${isActive ? 'text-yellow-300 poppins-bold border-1 border-white  rounded-sm px-2' : 'text-white'}`
          }
        >
          About
        </NavLink>

        <NavLink
          to="/register"
          className={({ isActive }) =>
            `relative text-white transition-all duration-300
            ${isActive ? 'text-yellow-300 poppins-bold border-1 border-white  rounded-sm px-2' : 'text-white'}`
          }
        >
          Register
        </NavLink>
        
        <NavLink
          to="/login"
          className={({ isActive }) =>
            `relative  text-white transition-all duration-300 
            ${isActive ? 'text-yellow-300 poppins-bold border-1 border-white  rounded-sm px-2' : 'text-white'}`
          }
        >
          Login
        </NavLink>
        </ul>
    </div>
  )
}

export default Nav
