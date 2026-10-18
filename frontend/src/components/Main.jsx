import React, { useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Channel from './Channel';
import Chat from './Chat';
const Main = () => {

  const location=useLocation();
  const youtubeData=location.state?.youtubeData;


return (
  <div className="Main w-full h-screen overflow-hidden bg-gradient-to-r from-[#ffffff] via-[#d5f7f7] to-[#9ddef4] flex flex-col">
    <div className="mt-16 flex-1 min-h-0 flex gap-10">
      <Channel youtubeData={youtubeData} />

      <div className="flex-1 min-w-0 min-h-0">
        <Chat />
      </div>
    </div>
  </div>
);
}

export default Main