import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from './Nav'

const PublicLayout = () => {
  return (
    <div className="public bg-black min-h-screen w-full relative overflow-y-hidden">
      <Nav />
        <div className="absolute inset-0 z-0">
            <video
            src="bg.mp4"
            muted
            autoPlay
            loop
            className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60"></div>
        </div>

      <div className="content relative z-20">
        <Outlet />
      </div>
    </div>
  )
}

export default PublicLayout
