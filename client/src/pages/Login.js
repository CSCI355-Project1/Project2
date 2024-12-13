import React from "react";
import LoginComponent from "../components/authentication/LoginComponent";
import { AuthProvider } from "../context/AuthContext";

const Login = () => {
  return (
    <AuthProvider>
      <LoginComponent />
    </AuthProvider>
  );
};

export default Login;
