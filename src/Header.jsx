import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./context/authContext.jsx";
import UploadModal from "./UploadModal.jsx";

const Header = () => {
  const { logout, state, login, uploadImage } = useAuth();

  const [toggleModal, setToggleModal] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <header className="mx-auto flex items-center justify-between p-6 lg:px-8 bg-gray-800 text-white">
        <Link to="/gallery" className="font-semibold text-lg">
          Gallery
        </Link>

        <div className="flex items-center gap-4">
          <h1 className="mr-4">
            Welcome, <Link to={"/account"}>{state?.user?.email}</Link>
          </h1>
          <button
            onClick={() => setToggleModal(true)}
            className="rounded-md p-2 bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          >
            Add Photo
          </button>
          {state.isLogin ? (
            <button
              onClick={handleLogout}
              className="rounded-md p-2 bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="rounded-md p-2 bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
            >
              Login
            </button>
          )}
        </div>
      </header>

      {toggleModal && (
        <UploadModal
          onClose={() => setToggleModal(false)}
          onToggleModal={setToggleModal}
        />
      )}
    </>
  );
};

export default Header;
