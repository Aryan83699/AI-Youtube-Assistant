import React, {useRef } from 'react'
import { NavLink,useNavigate } from 'react-router-dom'
import axios from 'axios';

const Otp = () => {
  
const inputsRef=useRef([]);

const navigate=useNavigate();

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, "");
    e.target.value = value.slice(-1);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

    const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  async function sendOTP(otp) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND}/otp`,
      {
        otp
      },
      {
        withCredentials: true
      }
    );

    if (response.status === 200) {
      navigate("/dashboard");
    }
  } catch (error) {
    console.log(error);
  }
}

  const handleSubmit = (e) => {
    e.preventDefault();

    const otp = inputsRef.current
      .map((input) => input?.value || "")
      .join("");

    console.log("Entered OTP:", otp);
    console.log("OTP length:", otp.length);

    sendOTP(otp);

  };

return (
    <div className="otp overflow-hidden h-screen relative z-10 pt-[9vh] p-5 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-7 box w-full md:w-1/3 bg-white/50 px-10 py-8 rounded-md border border-white relative backdrop-blur-xs"
      >
        <h1 className="text-slate-900 text-center poppins-bold text-2xl"> OTP Session </h1>

        <div className="flex justify-center items-center gap-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              required
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="input w-10 h-10 text-center border rounded"
            />
          ))}
        </div>

        <button type="submit" className="poppins-bold w-full bg-white/60 py-3 rounded-md cursor-pointer active:scale-90">
          Send </button>
      </form>
    </div>
  );
};

export default Otp;