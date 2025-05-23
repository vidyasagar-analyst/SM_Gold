import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const Protected = () => {
  const user = true;
  return user ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default Protected;
