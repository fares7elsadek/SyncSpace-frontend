import React from "react";
import { Navigate } from "react-router-dom";
import { getAccessToken } from "../utils/tokenServices";

const ProtectedRoute = ({ children }) => {
  const token = getAccessToken();
  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
