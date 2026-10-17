import React from 'react'

const Channel = ({youtubeData}) => {
  return (
    <div className='Channel w-[45%] min-h-full bg-gray-200 flex flex-col gap-3 px-7 py-3.5'>
        <h1 className='text-2xl text-black poppins-extrabold'>{youtubeData['video_data']['title']}</h1>
        <img src={youtubeData['transcript_data']['thumbnail']} alt="" className='h-80 w-120 rounded-lg shadow-md shadow-red-400'/>
        <div className="details flex gap-3.5 mt-4 flex-wrap justify-start items-center">
            <div className='flex gap-1'><p className='poppins-bold'>Date:- &nbsp;</p><p className="text-md poppins-regular">{youtubeData['video_data']['upload_date']}</p></div>
            <div className='flex gap-1'><p className='poppins-bold'>Channel:- &nbsp;</p><p className="text-md poppins-regular">{youtubeData['video_data']['channel']}</p></div>
            <div className='flex gap-1'><p className='poppins-bold'>No. of Likes:- &nbsp;</p><p className="text-md poppins-regular">{youtubeData['video_data']['likes']}</p></div>
            <div className='flex gap-1'><p className='poppins-bold'>No. of Views:- &nbsp;</p><p className="text-md poppins-regular">{youtubeData['video_data']['views']}</p></div>
        </div>
        <p className='poppins-regular text-sm'>{youtubeData['video_data']['description']}</p>
    </div>
  )
}

export default Channel