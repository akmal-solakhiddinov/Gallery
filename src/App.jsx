import React, { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { auth } from "./config/firebase";
import { useAuth } from "./context/authContext";
import GalleryLayout from "./GalleryLayout";
import ImageShow from "./Image";
import Login from "./login";
import NotFound from "./NotFound";
import Profile from "./Profile";
import ProtectedRoute from "./ProtectedRoute";
import SignUp from "./SignUp";

const App = () => {
  const { state } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={"/gallery"} />} />
        <Route path="gallery" element={<GalleryLayout />} />
        <Route path="account" element={<Profile />} />
        <Route
          path="gallery/image/:id"
          element={<ImageShow images={state?.images} />}
        />
        <Route
          path="account/image/:id"
          element={<ImageShow images={state?.user?.myImages} />}
        />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
