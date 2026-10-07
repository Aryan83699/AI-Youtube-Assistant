import React from 'react'
import { NavLink } from 'react-router-dom'

const Otp = () => {

return (
    <div className="otp overflow-hidden h-screen relative z-10 pt-[9vh] p-5 flex justify-center items-center ">

          <form onSubmit={(e)=>{e.preventDefault() }} className="flex flex-col gap-7 box w-1/3 bg-white/50 px-10 py-8 rounded-md border-1 border-white relative backdrop-blur-xs" >

            <h1 className='text-slate-900 text-center poppins-bold text-2xl'>
              OTP Session
            </h1>
            <div id="inputs" className="flex justify-center items-center gap-5 ">
                <input className="input w-10 h-10 border-1" type="text" inputMode='numeric' maxLength="1"  />
                <input className="input w-10 h-10  border-1" type="text" inputMode='numeric' maxLength="1"  />
                <input className="input w-10 h-10 border-1" type="text" inputMode='numeric' maxLength="1"  />
                <input className="input w-10 h-10 border-1" type="text" inputMode='numeric' maxLength="1"  />
                <input className="input w-10 h-10 border-1" type="text" inputMode='numeric' maxLength="1"  />
                <input className="input w-10 h-10  border-1" type="text" inputMode='numeric' maxLength="1"  />
            </div>
            <button className='poppins-bold mx-auto w-full bg-white/60 backdrop-blur-sm py-3 rounded-md cursor-pointer active:scale-90 active:text-sm'>
            Sign Up
            </button>

          </form>            

    </div>
  )
}


export default Otp