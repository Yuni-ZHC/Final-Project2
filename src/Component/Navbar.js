import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2 for the logout confirmation
import '../Css/Navbar.css'; // Ensure this file exists and has appropriate styling for navbar

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    // Show SweetAlert confirmation before logout
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, logout!',
    }).then((result) => {
      if (result.isConfirmed) {
        // Remove token from localStorage
        localStorage.removeItem('token');
        
        // Call onLogout function to trigger any additional logout logic
        onLogout();

        // Redirect user to login page after logout
        navigate('/login');

        // Show SweetAlert success message
        Swal.fire(
          'Logged Out!',
          'You have been logged out successfully.',
          'success'
        );
      }
    });
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Book Store Yuni</h1>
      </div>
      <ul className="navbar-menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/books">Books</Link></li>
          <li>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </li>
      </ul>
    </nav>
  );
};

export default Navbar;
