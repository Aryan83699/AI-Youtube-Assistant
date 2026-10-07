import React from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

  const navigate=useNavigate();

  if(!document.cookie.match("Token")){
      navigate('/register');
      }

  return (
    <div>Dashboard</div>
  )

}

export default Dashboard