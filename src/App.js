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
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');  // Setelah logout, arahkan ke halaman dashboard atau halaman lain
  };

  useEffect(() => {
    // Jangan arahkan pengguna ke halaman lain jika mereka belum login dan ingin membuka login
    if (isLoggedIn) {
      navigate('/books');  // Arahkan ke '/books' setelah login
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="App">
      {/* Navbar menerima status login */}
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        {/* Rute Publik */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
        <Route path="/register" element={<Register />} />

        {/* Rute Private */}
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
  );
}

export default App;
