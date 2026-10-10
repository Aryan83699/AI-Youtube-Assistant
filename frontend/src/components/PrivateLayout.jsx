import React, { useEffect } from 'react'
import {useNavigation, Outlet, useNavigate } from 'react-router-dom'
import Loading from './Loading'
import axios from 'axios';
import PrivateNav from './PrivateNav';

const PrivateLayout = () => {

const navigate = useNavigate();
  const navigation = useNavigation();

  useEffect(() => {
    async function verify() {
      try {
        await axios.get(
          `${import.meta.env.VITE_BACKEND}/auth`,
          { withCredentials: true }
        );
      } catch (error) {
        navigate('/register', { replace: true });
      }
    }

    verify();
  }, []);
  
  return (
    <div className="min-h-screen w-full bg-gray-100">
      {navigation.state==='loading' && <Loading />}
      <PrivateNav />
      <Outlet />
    </div>
  )
}

export default PrivateLayout
