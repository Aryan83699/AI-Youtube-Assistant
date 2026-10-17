import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'




const Upload = () => {

  const navigate=useNavigate();
  const [curr_url,seturl]=useState();

    async function sendUrl(curr_url){
      try{
            const response =await axios.post(`${import.meta.env.VITE_BACKEND}/youtube/check-transcript`,
      {
        url:curr_url
      },
      {
        withCredentials:true
      }
    );

    if(response.status===200){
      navigate('/main');
    }

      }
      catch(error){
          console.log(error);
      }
  }



  return (
    <div className="upload h-screen w-full flex justify-center items-center">
      <form className='flex flex-col justify-evenly items-center  bg-gray-200 rounded-lg h-[60%] mt-10 w-[70%]' onSubmit={(e)=> {e.preventDefault(); sendUrl(curr_url) }}>
        <p className='poppins-extrabold text-4xl'>Upload Video URL</p>
        <div className="url flex gap-5">
        <input type="text" size="85" className='border-2 border-gray-500 px-5 py-2 rounded-2xl' placeholder='paste url here ....' autoFocus required onChange={(e)=>{seturl(e.target.value)}}/>
        <input type="submit" className='bg-[#FF0033] text-white cursor-pointer active:scale-90 poppins-bold px-5 py-1 rounded-lg ' value="Add" />
        </div>
        <p className='text-center poppins-md text-[0.5rem]'>By uploading an URL you agree to our Terms of Service </p>
      </form>

    </div>
  )

}

export default Upload