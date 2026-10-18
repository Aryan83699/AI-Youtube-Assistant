
import React, { useEffect, useState } from 'react';
import {
  Outlet,
  useNavigate,
  useNavigation
} from 'react-router-dom';

import Loading from './Loading';
import axios from 'axios';
import PrivateNav from './PrivateNav';

const PrivateLayout = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();

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

  // Authentication check is in progress
  if (loading) {
    return <Loading />;
  }

  // Authentication failed or redirect is pending
  if (!authenticated) {
    return null;
  }

  // Route loader is in progress
  if (navigation.state === 'loading') {
    return <Loading />;
  }

  return (
    <div className="min-h-screen w-full bg-gray-100">
      <PrivateNav />
      <Outlet />
    </div>
  );
};

export default PrivateLayout;
