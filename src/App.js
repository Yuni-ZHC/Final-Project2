// App.js
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Dashboard from './Component/Dashboard';
import Navbar from './Component/Navbar';
import Login from './Component/Login';
import Books from './Component/Books';
import Tambah from './Component/Tambah';
import Edit from './Component/Edit';
import Register from './Component/Register';
import PrivateRoutes from './private/PrivateRoutes';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const navigate = useNavigate();  // Gunakan useNavigate di sini

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');  // Redirect ke Dashboard setelah logout
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/books');  // Redirect ke '/books' jika sudah login
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="App">
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <div>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
          <Route path="/register" element={<Register />} />

          {/* Private Routes */}
          <Route 
            path="/books" 
            element={<PrivateRoutes><Books /></PrivateRoutes>} 
          />
          <Route 
            path="/tambah" 
            element={<PrivateRoutes><Tambah /></PrivateRoutes>} 
          />
          <Route 
            path="/edit/:id" 
            element={<PrivateRoutes><Edit /></PrivateRoutes>} 
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
