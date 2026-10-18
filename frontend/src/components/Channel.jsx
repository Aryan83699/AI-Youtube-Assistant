import React from 'react'

const Channel = ({ youtubeData }) => {
  const video = youtubeData.video_data;
  const thumbnail = youtubeData.transcript_data.thumbnail;

  return (
    <div className="Channel w-[45%] h-full min-h-0 overflow-y-auto bg-gradient-to-r from-[#ffffff] to-[#ffe2fb] flex flex-col gap-5 px-7 py-6 rounded-2xl border border-pink-100 shadow-lg shadow-pink-200/40">

      {/* Video Title */}
      <div className="flex flex-col gap-2">
        <span className="text-xs uppercase tracking-[0.2em] text-gray-500 poppins-bold">
          Video Overview
        </span>

        <h1 className="text-2xl text-black poppins-extrabold leading-snug">
          {video.title}
        </h1>
      </div>

      {/* Thumbnail */}
      <div className="relative w-full shrink-0 rounded-xl group">
        <img
          src={thumbnail}
          alt={video.title}
          className="w-full h-auto block rounded-xl shadow-md shadow-red-300/50 transition-transform duration-500 group-hover:scale-[1.03]"
        />

        <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/5 pointer-events-none" />
      </div>

      {/* Video Statistics */}
      <div className="grid grid-cols-2 gap-3 mt-1">

        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-3.5 border border-pink-100 transition-all duration-300 hover:bg-white hover:-translate-y-0.5">
          <p className="text-xs text-gray-500 poppins-regular mb-1">
            Published On
          </p>
          <p className="text-sm text-black poppins-bold break-words">
            {video.upload_date || "N/A"}
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-3.5 border border-pink-100 transition-all duration-300 hover:bg-white hover:-translate-y-0.5">
          <p className="text-xs text-gray-500 poppins-regular mb-1">
            Channel
          </p>
          <p className="text-sm text-black poppins-bold break-words">
            {video.channel || "N/A"}
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-3.5 border border-pink-100 transition-all duration-300 hover:bg-white hover:-translate-y-0.5">
          <p className="text-xs text-gray-500 poppins-regular mb-1">
            Total Likes
          </p>
          <p className="text-md text-black poppins-extrabold">
            {video.likes ?? "N/A"}
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-3.5 border border-pink-100 transition-all duration-300 hover:bg-white hover:-translate-y-0.5">
          <p className="text-xs text-gray-500 poppins-regular mb-1">
            Total Views
          </p>
          <p className="text-md text-black poppins-extrabold">
            {video.views ?? "N/A"}
          </p>
        </div>

      </div>

      {/* Description */}
      <div className="flex flex-col gap-2 mt-1">
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 rounded-full bg-pink-300" />
          <h2 className="text-sm text-black poppins-bold">
            About this video
          </h2>
        </div>

        <p className="text-xs text-gray-700 poppins-regular leading-5 whitespace-pre-line">
          {video.description || "No description available."}
        </p>
      </div>

    </div>
  );
};

export default Channel;