import React from 'react'
import { Outlet } from 'react-router-dom'

const PrivateLayout = () => {
  return (
    <div className="min-h-screen w-full bg-gray-100">
      <Outlet />
    </div>
  )
}

export default PrivateLayout
