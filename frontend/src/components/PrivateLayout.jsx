import React from 'react'
import {useNavigation, Outlet } from 'react-router-dom'
import Loading from './Loading'

const PrivateLayout = () => {

  const navigation = useNavigation();
  
  return (
    <div className="min-h-screen w-full bg-gray-100">
      {navigation.state==='loading' && <Loading />}
      <Outlet />
    </div>
  )
}

export default PrivateLayout
