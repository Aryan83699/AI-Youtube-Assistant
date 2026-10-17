import React, { useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Channel from './Channel';
import Chat from './Chat';
const Main = () => {

  const location=useLocation();
  const youtubeData=location.state?.youtubeData;



  return (
<div className="Main w-full min-h-screen bg-yellow-100 flex flex-col">
  <div className="mt-16 min-h-0 gap-10 flex">
    <Channel youtubeData={youtubeData} />
    <Chat></Chat>
  </div>
</div>
  )
}

export default Main