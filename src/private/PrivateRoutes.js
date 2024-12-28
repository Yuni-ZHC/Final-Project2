import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const authToken = localStorage.getItem("authToken"); // Get token from localStorage

  // Check if token exists
  return authToken ? children : <Navigate to="/" />;
};

export default PrivateRoutes;
