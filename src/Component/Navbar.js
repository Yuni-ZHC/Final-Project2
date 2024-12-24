import React from 'react';
import { Link } from 'react-router-dom';
import '../Css/Navbar.css'; // Pastikan file CSS ini ada dan diatur untuk styling navbar

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Book Store Yuni</h1>
      </div>
      <ul className="navbar-menu">
        <li><Link to="/">Home</Link></li>          
        <li><Link to="/books">Books</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
