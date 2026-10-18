import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0f0f0f]">

      {/* YouTube Logo */}
      <div className="relative flex items-center justify-center mb-8">
        <div className="absolute w-28 h-28 rounded-full bg-red-600/20 blur-2xl animate-pulse"></div>

        <div className="relative rounded-2xl flex items-center justify-center w-20 h-14 bg-[#ff0033] rounded-2xl shadow-lg shadow-red-600/30 animate-pulse">
            <img className='rounded-3xl' src="dino.jpg" alt="" />
        </div>
      </div>

      {/* Loading Text */}
      <h1 className="text-white text-xl font-semibold tracking-wide mb-2">
        Almost there
      </h1>

      <p className="text-gray-400 text-sm mb-8">
        Getting everything ready for you...
      </p>

      {/* Animated Loading Bar */}
      <div className="w-52 h-1.5 bg-[#303030] rounded-full overflow-hidden">
        <div className="h-full w-1/2 bg-[#ff0033] rounded-full animate-loading"></div>
      </div>

      {/* Branding */}
      <p className="absolute bottom-8 text-xs tracking-[0.25em] text-gray-500 uppercase">
        Enjoy the experience
      </p>

      <style>{`
        @keyframes loading {
          0% {
            transform: translateX(-110%);
          }
          100% {
            transform: translateX(210%);
          }
        }

        .animate-loading {
          animation: loading 1.2s ease-in-out infinite;
        }
      `}</style>

    </div>
  );
};

export default Loading;