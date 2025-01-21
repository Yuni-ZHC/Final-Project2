import React from "react";
import { Link } from "react-router-dom";
import '../Css/Navbar.css';

const Navbar = ({ isLoggedIn, handleLoginLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Brand / Logo */}
        <h1 className="navbar-brand">Toko Buku Yuni</h1>
        
        {/* Navigation Links */}
        <ul className="navbar-links">
          {!isLoggedIn && (
            <li className="navbar-item">
              <Link to="/" className="navbar-link">Home</Link>
            </li>
          )}
          
          {isLoggedIn ? (
            <>
              <li className="navbar-item">
                <Link to="/books" className="navbar-link">Produk</Link>
              </li>
              <li className="navbar-item">
                <button onClick={handleLoginLogout} className="navbar-btn">Logout</button>
              </li>
            </>
          ) : (
            <li className="navbar-item">
              <Link to="/login" className="navbar-btn navbar-login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
