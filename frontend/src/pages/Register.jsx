
import React, { useState, useRef } from 'react';
import {
  NavLink,
  UNSAFE_createClientRoutesWithHMRRevalidationOptOut,
  useNavigate
} from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import axios from 'axios';

const Register = () => {
  const box = useRef(null);
  const leftContent = useRef(null);
  const heading = useRef(null);
  const description = useRef(null);
  const tags = useRef(null);

  const navigate = useNavigate();

  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: {
        ease: 'power3.out',
      },
    });

    tl.from(leftContent.current, {
      opacity: 0,
      x: -70,
      duration: 0.9,
    })
      .from(
        heading.current,
        {
          opacity: 0,
          y: 35,
          duration: 0.8,
        },
        '-=0.4'
      )
      .from(
        description.current,
        {
          opacity: 0,
          y: 25,
          duration: 0.7,
        },
        '-=0.4'
      )
      .from(
        tags.current.children,
        {
          opacity: 0,
          y: 15,
          stagger: 0.15,
          duration: 0.5,
        },
        '-=0.3'
      );

    gsap.from(box.current, {
      opacity: 0,
      x: 100,
      duration: 1,
      ease: 'expo.out',
      delay: 0.2,
    });
  });

  const [currEmail, setEmail] = useState();
  const [currPswd, setPswd] = useState();

  async function sendCredentials(email, password) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND}/check-transcript`,
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        navigate('/otp');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="register overflow-hidden relative z-10 pt-[9vh] p-5 flex justify-evenly">

      {/* Left content */}
      <div
        ref={leftContent}
        className="left w-[55%] px-5 py-10 flex flex-col justify-center"
      >
        <p className="text-sm uppercase tracking-[0.3em] text-red-400 poppins-bold mb-6">
          Your AI-powered learning companion
        </p>

        <p
          ref={heading}
          className="text-7xl leading-tight text-white poppins-extrabold"
        >
          Understand
          <br />
          YouTube Videos
          <br />
          <span className="text-red-500">in Seconds.</span>
        </p>

        <p
          ref={description}
          className="mt-7 max-w-xl text-lg leading-8 text-white/75 poppins-medium-italic"
        >
          Turn hours of video content into clear insights. Generate concise
          summaries, explore important concepts, and get instant answers to
          your questions — all with the power of AI.
        </p>

        <div ref={tags} className="mt-8 flex flex-wrap gap-3">
          <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm">
            AI Summaries
          </span>

          <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm">
            Video Q&A
          </span>

          <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm">
            Smarter Learning
          </span>
        </div>
      </div>

      {/* Registration form */}
      <div className="right w-[35%] h-[88vh] px-5 py-10 flex justify-center items-center">

        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendCredentials(currEmail, currPswd);
          }}
          className="flex flex-col gap-7 box w-full bg-white/50 px-10 py-8 rounded-md border border-white relative backdrop-blur-xs shadow-xl shadow-black/10"
          ref={box}
        >
          <h1 className="text-slate-900 text-center poppins-bold text-2xl">
            Create Account
          </h1>

          <p className="text-center text-slate-700 text-sm -mt-4">
            Get started with your AI YouTube Assistant
          </p>

          <div className="w-full">
            <label className="mb-2 block text-slate-800 poppins-medium text-sm">
              Enter Email
            </label>

            <input
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-md border border-white/80 w-full p-3 bg-white/40 text-slate-900 outline-none transition-all duration-300 focus:bg-white/70 focus:border-red-500 focus:ring-2 focus:ring-red-400/30"
              type="email"
              placeholder="Enter your email address"
            />
          </div>

          <div className="w-full">
            <label className="mb-2 block text-slate-800 poppins-medium text-sm">
              Enter Password
            </label>

            <input
              onChange={(e) => setPswd(e.target.value)}
              className="rounded-md border border-white/80 w-full p-3 bg-white/40 text-slate-900 outline-none transition-all duration-300 focus:bg-white/70 focus:border-red-500 focus:ring-2 focus:ring-red-400/30"
              type="password"
              placeholder="Enter your password"
            />
          </div>

          <button
            className="poppins-bold w-full bg-red-600/90 hover:bg-red-600 text-white py-3 rounded-md cursor-pointer shadow-md shadow-red-500/20 transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
          >
            Sign Up <span className="ml-1">→</span>
          </button>

          <div className="mx-auto text-center">
            <span className="text-slate-800 poppins-medium text-sm">
              Already have an account?{' '}
            </span>

            <NavLink
              to="/login"
              className="text-red-700 hover:text-red-900 poppins-bold text-sm transition-colors"
            >
              Login
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
