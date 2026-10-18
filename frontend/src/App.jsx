import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Register from './pages/Register';
import PublicLayout from './components/PublicLayout';
import PrivateLayout from './components/PrivateLayout';
import Upload from './pages/Upload';
import Login from './pages/Login';
import Otp from './pages/Otp';
import Main from './pages/Main';

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
        path: '/upload',
        element: <Upload />,
          loader: async () => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return null;
  }
      },
    {
        path: '/main',
        element: <Main />,
          loader: async () => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return null;
  }
      }
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;