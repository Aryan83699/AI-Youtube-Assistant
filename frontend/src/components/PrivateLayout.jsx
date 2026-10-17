
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Loading from './Loading';
import axios from 'axios';
import PrivateNav from './PrivateNav';

const PrivateLayout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    async function verify() {
      try {
        await axios.get(
          `${import.meta.env.VITE_BACKEND}/auth`,
          { withCredentials: true }
        );

        setAuthenticated(true);
      } catch (error) {
        navigate('/register', { replace: true });
      } finally {
        setLoading(false);
      }
    }

    verify();
  }, [navigate]);

  if (loading) {
    return <Loading />;
  }

  if (!authenticated) {
    return null;
  }

  return (
    <div className="min-h-screen w-full bg-gray-100">
      <PrivateNav />
      <Outlet />
    </div>
  );
};

export default PrivateLayout;
