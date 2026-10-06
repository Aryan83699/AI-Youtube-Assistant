import React from 'react'
import Nav from './components/Nav';
import {BrowserRouter , Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Register from './components/Register';
import PublicLayout from './components/PublicLayout';
import PrivateLayout from './components/PrivateLayout';
import Dashboard from './components/Dashboard';


const App = () => {
  return (
   <> 
    <Routes>

      {/* Public */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Authenticated */}
      <Route element={<PrivateLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

    </Routes>
  </>

  )
}

export default App