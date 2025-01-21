import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faKey,
  faEyeSlash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import '../Css/Register.css';
import { API_REGISTER } from "../utils/BaseUrl";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi form input
    if (username.trim() === "" || email.trim() === "" || password.trim() === "") {
      setErrorMessage("Semua field harus diisi.");
      return;
    }

    if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password)
    ) {
      Swal.fire({
        icon: "error",
        title:
          "Password harus memiliki minimal 8 karakter, satu huruf besar, dan satu huruf kecil.",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    try {
      // Mengirim data ke server menggunakan Axios
      const response = await axios.post(`${API_REGISTER}`, {
        username,
        email,
        password,
      });

      // Menangani respons dari server
      Swal.fire({
        icon: "success",
        title: "Registrasi berhasil!",
        text: `Akun untuk ${response.data.username} berhasil dibuat.`,
        showConfirmButton: true,
      });

      // Redirect setelah sukses
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      console.error("Error during registration:", error);
      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        Swal.fire({
          icon: "error",
          title: "Terjadi kesalahan saat registrasi.",
          text: "Coba lagi nanti.",
          showConfirmButton: true,
        });
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Register</h2>
        {errorMessage && (
          <p className="register-error-message">{errorMessage}</p>
        )}
        <form onSubmit={handleSubmit} className="register-form">
          {/* Username Field */}
          <div className="register-form-group">
            <label htmlFor="username" className="register-label"></label>
            <div className="register-input-group">
              <span className="register-input-icon"><FontAwesomeIcon icon={faUser} /></span>
              <input
                type="text"
                id="username"
                className="register-input"
                placeholder="Enter your username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="register-form-group">
            <label htmlFor="email" className="register-label"></label>
            <div className="register-input-group">
              <span className="register-input-icon"><FontAwesomeIcon icon={faUser} /></span>
              <input
                type="email"
                id="email"
                className="register-input"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="register-form-group">
            <label htmlFor="password" className="register-label"></label>
            <div className="register-input-group">
              <span className="register-input-icon"><FontAwesomeIcon icon={faKey} /></span>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="register-input"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="register-password-toggle"
                onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="register-submit-button">Register</button>

          <p className="register-login-link">
            Sudah punya akun? <a href="/login">Masuk</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
