import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "./context/authContext";
import Header from "./Header";

const GalleryLayout = () => {
  const { uploadImage, state, getImages } = useAuth();

  const navigate = useNavigate();

  const images = state?.images?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const imagesLength = state?.images?.length;

  useEffect(() => {
    getImages();
  }, []);

  useEffect(() => {
    if (!state.isLogin) navigate("/login");
  }, [state.isLogin]);

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-8">
        {imagesLength <= 0 && (
          <div className="text-center mt-8">
            <h1 className="text-2xl font-bold">We don't have any photos yet</h1>
            <p className="mt-2 text-gray-500">Upload a photo to get started!</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {state.isLoading ? (
            <p>Loading...</p>
          ) : (
            images.map((img) => (
              <Link
                to={`/gallery/image/${img.id}`}
                className="group block w-full aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-200 hover:bg-gray-300"
                key={img.id}
              >
                <img
                  src={img.image}
                  alt={`Image ${img.id}`}
                  className="object-cover w-full h-full transition duration-300 transform group-hover:scale-105"
                />
              </Link>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default GalleryLayout;
