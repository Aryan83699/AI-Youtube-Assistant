import React from 'react'

const Register = () => {
  return (
    <div className="relative z-10 pt-[9vh] p-5 flex justify-evenly ">
        <div className="left w-[55%] px-5 py-10">
            <p className='text-7xl leading-20 text-white poppins-extrabold'>Understand <br /> Youtube Videos  <br /> in Seconds</p>
            <br /> 
      
        </div>
        <div className="right w-[35%] px-5 py-10 flex justify-center items-center">
          <div className="flex flex-col gap-7 box h-full w-full bg-white/30 px-10 py-8 rounded-md border border-white relative backdrop-blur-xs">
                  <div className='w-full'>
                      <span className='text-black z-5 poppins-medium text-md'>Enter Email :- </span><input className="rounded-md border-1 w-3/4 p-0.5 border-black" type="email" />
                  </div>
                  <div className='w-full'>
                      <span className='text-black z-5 poppins-medium text-md'>Enter Password :- </span><input className="rounded-md border-1 w-3/4 p-0.5 border-black" type="password" />
                  </div>
              <button className='poppins-bold mx-auto w-full bg-white/30 backdrop-blur-sm py-3 rounded-md cursor-pointer active:scale-90 active:text-sm'>
                Register
              </button>
          </div>            
        </div>
    </div>
  )
}

export default Register