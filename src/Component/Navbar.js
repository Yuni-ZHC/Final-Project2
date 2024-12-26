import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Css/Navbar.css'; // Pastikan file CSS ini ada dan diatur untuk styling navbar

const Navbar = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  // Fungsi untuk menangani logout
  const handleLogout = () => {
    onLogout();  // Panggil fungsi onLogout dari props untuk logout
    navigate('/login'); // Arahkan pengguna ke halaman login setelah logout
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Book Store Yuni</h1>
      </div>
      <ul className="navbar-menu">
        <li><Link to="/">Home</Link></li>
         <li><Link to="/books">Books</Link></li>
        {isLoggedIn ? (
          <li>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </li>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
