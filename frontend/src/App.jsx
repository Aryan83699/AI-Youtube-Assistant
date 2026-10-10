import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './components/Home';
import About from './components/About';
import Register from './components/Register';
import PublicLayout from './components/PublicLayout';
import PrivateLayout from './components/PrivateLayout';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Otp from './components/Otp';

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/otp',
        element: <Otp />,
          loader: async () => {
          await new Promise(resolve => setTimeout(resolve, 1500));
          return null;
        }
      },
    ],
  },
  {
    element: <PrivateLayout />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
          loader: async () => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return null;
  }
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;