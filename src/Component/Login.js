import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faEye, faEyeSlash, faUser } from "@fortawesome/free-solid-svg-icons";
import '../Css/Login.css'; // Import custom CSS
import axios from 'axios';
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import Swal from 'sweetalert2'; // Import SweetAlert2
import { API_LOGIN } from "../utils/BaseUrl";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate(); // Initialize navigate function

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const loginRequest = { email, password };
      const response = await axios.post(`${API_LOGIN}`, loginRequest);
  
      // Pastikan API respons mengirimkan data yang benar
const { token, data: adminData } = response.data;

if (token && adminData) {
  localStorage.setItem('authToken', token);
  localStorage.setItem('adminData', JSON.stringify(adminData));
  localStorage.setItem('adminId', adminData.id);
  // Navigasi ke /books setelah login sukses
  navigate("/books");
} else {
  // Jika token atau adminData tidak ada, tampilkan error
  Swal.fire({
    title: 'Login Failed',
    text: 'Invalid login credentials.',
    icon: 'error',
    confirmButtonText: 'Try Again',
  });
}

  
    } catch (error) {
      // Handle errors
      if (error.response && error.response.status === 401) {
        setErrorMessage("Invalid email or password.");
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };
  

  return (
    <div className="login-page">
      <div className="login-card">
        <h3 className="login-card-title">Welcome Back!</h3>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-wrapper">
            <label htmlFor="email" className="input-label">Email</label>
            <div className="input-container">
              <span className="input-icon"><FontAwesomeIcon icon={faUser} /></span>
              <input
                type="email"
                id="email"
                className="input-field"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="input-wrapper">
            <label htmlFor="password" className="input-label">Password</label>
            <div className="input-container">
              <span className="input-icon"><FontAwesomeIcon icon={faKey} className="small-icon" /></span>
              <input
                type={showPassword ? "text" : "password"} // Benar: Tampilkan teks jika true
                id="password"
                className="input-field"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} className="small-icon" />
                {/* Benar: Eye untuk tampil, Eye Slash untuk sembunyi */}
              </button>
            </div>
          </div>
          <div className="btn-container">
            <button className="login-btn" type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
