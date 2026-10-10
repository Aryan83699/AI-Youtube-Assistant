import React from 'react'
import { useNavigate } from 'react-router-dom'

const Upload = () => {

  return (
    <div className="upload h-screen w-full flex justify-center items-center">
      <form className='flex flex-col justify-evenly items-center  bg-gray-200 rounded-lg h-[60%] mt-10 w-[70%]' >
        <p className='poppins-extrabold text-4xl'>Upload Video URL</p>
        <div className="url flex gap-5">
        <input type="text" className='border-2 border-gray-500 pl-5 pr-20 py-2 rounded-2xl' placeholder='paste url here ....' autoFocus required />
        <input type="submit" className='bg-[#FF0033] text-white poppins-bold px-5 py-1 rounded-lg ' value="Add" />
        </div>
        <p className='text-center poppins-md text-[0.5rem]'>By uploading an URL you agree to our Terms of Service </p>
      </form>

    </div>
  )

}

export default Upload