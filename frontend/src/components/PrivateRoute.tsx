import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute: React.FC = () => {
  const { authToken } = useAuth();

  return authToken ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;