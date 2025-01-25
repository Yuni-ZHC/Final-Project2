import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Css/Navbar.css'; // Pastikan untuk menambahkan file CSS ini

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Brand / Logo */}
        <h1 className="navbar-brand">Toko Buku Yuni</h1>
        
        {/* Navigation Links */}
        <ul className="navbar-links">
          {/* Home button */}
          <li className="navbar-item">
            <NavLink to="/books" className="navbar-link" activeClassName="active">
              Produk
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink to="/logout" className="navbar-link" activeClassName="active">
              Logout
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
