import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { auth } from "./config/firebase";
import { useAuth } from "./context/authContext";

const ProtectedRoute = ({ children }) => {
  const { state, getUser } = useAuth();
  const location = useLocation();

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       const userData = {
  //         uid: user.uid,
  //         email: user.email,
  //         displayName: user.displayName,
  //         photoURL: user.photoURL,
  //         emailVerified: user.emailVerified,
  //       };
  //       getUser(userData);
  //     }
  //   });

  //   return () => unsubscribe();
  // }, []);

  // // Check if the current location is '/login'
  // const isLoginPage = location.pathname === "/login";

  // Render the child components only if the user is logged in and not on the login page
  return (
    <Navigate to="/login" replace />
  ); /* !state.isLoading && state.isLogin && !isLoginPage ? (
    
    <Outlet />
  ) : ( */

  // );
};

export default ProtectedRoute;
