import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../Utils/AppContext";

const Protected = () => {
  const { isAuth } = useContext(AppContext);
  return isAuth ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default Protected;
