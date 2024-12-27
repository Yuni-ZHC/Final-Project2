import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Component/Dashboard';
import Navbar from './Component/Navbar';
import Login from './Component/Login';
import Books from './Component/Books';
import Tambah from './Component/Tambah';
import Edit from './Component/Edit';
import Register from './Component/Register';
import PrivateRoutes from './private/PrivateRoutes'; // Import PrivateRoutes
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={!!localStorage.getItem('token')} onLogout={() => localStorage.removeItem('token')} />
        <div>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Private Routes (Only accessible if logged in) */}
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

            {/* Catch-all Route (404) */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
