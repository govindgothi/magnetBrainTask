import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from './isAuthenticated'
import { useState } from "react";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const check = async () => {
      const result = await isAuthenticated();
      setAuth(result);
    };
    check();
  }, []);
  if (auth === null) return <p>Loading...</p>;
  if (auth === false) return <Navigate to="/" replace />;
  return children;
};

export default ProtectedRoute;
