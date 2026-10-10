import React , {useState} from 'react';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate=useNavigate();
  const [currEmail,setEmail]=useState("");
  const [currPswd,setPswd]=useState("");

  // const refEmail=useRef();
  // const refPswd=useRef();

async function sendCredentials(email, password) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND}/login`,
      {
        email,
        password
      },
      {
        withCredentials: true
      }
    );

    if (response.status === 200) {
      navigate("/upload");
    }
  } catch (error) {
    console.log(error);
  }
}

  
  return (
    <div className="login relative z-10 pt-[9vh] p-5 flex justify-evenly ">
        <div className="left w-[55%] px-5 py-10">
            <p className='text-7xl leading-20 text-white poppins-extrabold'>Understand <br /> Youtube Videos  <br /> in Seconds</p>
            <br /> 
      
        </div>
        <div className="right w-[35%] h-[88vh] px-5 py-10 flex justify-center items-center">
          <form className="flex flex-col gap-7 box w-full bg-white/50 px-10 py-8 rounded-md border-1 border-white relative backdrop-blur-xs" onSubmit={(e)=>{e.preventDefault(); sendCredentials(currEmail,currPswd);}}>

            <h1 className='text-slate-900 text-center poppins-bold text-2xl'>
              Login
            </h1>
                  <div className='w-full'>
                      <span className='text-slate-800 z-5 poppins-medium text-md'>Enter Email :- </span>
                      <input value={currEmail} className="rounded-md border-1 w-3/4 p-0.5 border-black" type="email" onChange={(e)=> {setEmail(e.target.value)}}  />
                  </div>
                  <div className='w-full'>
                      <span className='text-slate-800 z-5 poppins-medium text-md'>Enter Password :- </span>
                      <input value={currPswd} className="rounded-md border-1 w-3/4 p-0.5 border-black" type="password" onChange={(e)=> {setPswd(e.target.value)}} />
                  </div>
              <div className=' flex justify-between'>
                <div>
                  <input type="checkbox" /> <span className='poppins-medium text-sm'>Remember Me</span>
                </div>
                <a href="" className='poppins-medium text-sm'>Forgot Password ?</a>
              </div>
              <input type="submit" value="Login" className='poppins-bold mx-auto w-full bg-white/60 backdrop-blur-sm py-3 rounded-md cursor-pointer active:scale-90 active:text-sm' >
              </input>
              <div className='mx-auto'>
                <span className='text-slate-800 poppins-medium text-sm'>Don't have an account ? </span>
                  <NavLink
                    to="/register">
                    <span className='text-slate-800 poppins-bold text-md'>Register</span>
                  </NavLink>
              </div>
          </form>            
        </div>
    </div>
  )
}

export default Login