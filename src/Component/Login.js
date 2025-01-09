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

      // Assuming the response contains the token and user data
      const { token, data } = response.data;

      // Save token to localStorage
      localStorage.setItem("authToken", token);

      // Optionally save user data
      localStorage.setItem("adminData", JSON.stringify(data));

      // Show success alert using SweetAlert
      Swal.fire({
        title: 'Login Successful!',
        text: 'You have logged in successfully.',
        icon: 'success',
        confirmButtonText: 'Ok',
      }).then((result) => {
        if (result.isConfirmed) {
          console.log("Navigating to /books");
          // Redirect to the 'books' page after successful login
          navigate("/books"); 
        }
      });

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
    <div className="login-container">
      <div className="login-card">
        <h3 className="login-card-title">Welcome Back!</h3>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form onSubmit={handleLogin}>
          <div className="input-group-wrapper">
            <label htmlFor="email" className="input-label">Email</label>
            <div className="input-group">
              <span className="input-group-icon"><FontAwesomeIcon icon={faUser} /></span>
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
          <div className="input-group-wrapper">
            <label htmlFor="password" className="input-label">Password</label>
            <div className="input-group">
              <span className="input-group-icon"><FontAwesomeIcon icon={faKey} className="small-icon" /></span>
              <input
                type={showPassword ? "text" : "password"}
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
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="small-icon" />
              </button>
            </div>
          </div>
          <div className="btn-container">
            <button className="submit-btn" type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
