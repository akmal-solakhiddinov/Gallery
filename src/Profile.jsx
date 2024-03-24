import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./context/authContext";
import Header from "./Header";

const Profile = () => {
  const { state, getMyImages, deleteMyImage, hideImage, unhideImage } =
    useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getMyImages();
  }, [state.isLogin]);

  const handleDeleteImage = (id, name) => {
    deleteMyImage(id, name);
  };
  const handleHideImage = (id) => {
    hideImage(id);
  };
  const handleUnHideImage = (id) => {
    unhideImage(id);
  };

  const myImages = state.user?.myImages;
  const imagesLength = myImages?.length;

  /* 
  ?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  */

  return (
    <div>
      <Header />
      <span></span>

      <main className="container mx-auto px-4 py-8">
        {imagesLength === 0 && (
          <div className="text-center mt-8">
            <h1 className="text-2xl font-bold">
              You don't have any photos yet
            </h1>
            <p className="mt-2 text-gray-500">Upload a photo to get started!</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {state.isLoading ? (
            <p>Loading...</p>
          ) : (
            myImages?.map((img) => (
              <div key={img.id} className="relative">
                <Link
                  to={`/account/image/${img.id}`}
                  className="group block w-full h-40 aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-200 hover:bg-gray-300"
                >
                  <img
                    src={img.image}
                    alt={`Image ${img.id}`}
                    className="object-cover w-full h-full transition duration-300 transform group-hover:scale-105"
                  />
                </Link>
                <div className="absolute top-0 right-0 mt-2 mr-2 flex gap-2">
                  <button
                    onClick={() => handleDeleteImage(img.id, img.imageName)}
                    className="bg-red-500 hover:bg-red-600 rounded-full p-2 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414L11.414 12l3.293 3.293a1 1 0 01-1.414 1.414L10 13.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 12 5.293 8.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  {!img.hidden ? (
                    <button
                      onClick={() => handleHideImage(img.id)}
                      className="bg-gray-500 hover:bg-gray-600 rounded-full p-2 focus:outline-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-eye-slash"
                        viewBox="0 0 16 16"
                      >
                        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                        <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                      </svg>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUnHideImage(img.id)}
                      className="bg-gray-500 hover:bg-gray-600 rounded-full p-2 focus:outline-none"
                    >
                      <svg
                        width="16px"
                        height="16px"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="white"
                        className="bi bi-eye"
                      >
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Profile;
