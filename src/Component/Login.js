import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faKey,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import '../Css/Login.css'; 

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    const Logindata = {
      email: email.trim(), // Hapus spasi tambahan pada email
      password: password,  // Pastikan password sesuai
    };
  
    try {
      const response = await axios.post('http://localhost:8080/api/login', Logindata, {
        headers: {
          'Content-Type': 'application/json', // Pastikan header sesuai
        },
      });
  
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1000,
        });
  
        // Redirect to Books page
        setTimeout(() => {
          window.location.href = "/Books";
        }, 1000);
  
        // Save data to localStorage
        const { id, role, token } = response.data.data;
        localStorage.setItem("id", id);
        localStorage.setItem("role", role);
        localStorage.setItem("token", token);
      }
    } catch (error) {
      // Tampilkan error berdasarkan status response backend
      if (error.response && error.response.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Invalid Email or Password",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Something went wrong!",
          text: error.message,
        });
      }
      console.error("Login error:", error.response || error.message);
    }
  };
  
  return (
    <div className="container">
      <div className="card galaxy-card">
        <h2 className="card-title">Login</h2>
        <form onSubmit={handleLogin}>
          {/* Email Field */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <div className="input-group">
              <span className="input-group-text"><FontAwesomeIcon icon={faEnvelope} /></span>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-group">
              <span className="input-group-text"><FontAwesomeIcon icon={faKey} /></span>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="form-control"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100 mb-3">Login</button>

          <p className="text-center">
            Don't have an account?{" "}
            <a href="/register" className="text-primary">Sign up now</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
