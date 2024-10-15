import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider"; // Create an Auth context (explained later)

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
