import React from "react";
import { Link } from "react-router-dom";
import '../Css/Navbar.css';

const Navbar = ({ isLoggedIn, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Brand / Logo */}
        <h1 className="navbar-brand">Toko Buku Yuni</h1>
        
        {/* Navigation Links */}
        <ul className="navbar-links">
          {/* Home button is always shown */}
          <li className="navbar-item">
            <Link to="/dashboard" className="navbar-link">Home</Link>
          </li>
            <li className="navbar-item">
              <Link to="/login" className="navbar-btn navbar-login">Login</Link>
            </li>
          
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
