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
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto p-4 lg:px-8 flex flex-wrap justify-between items-center">
        <div className="flex items-center gap-4">
          <Link to="/gallery" className="font-semibold text-lg">
            Gallery
          </Link>

          <h1 className="mr-4 text-sm">
            Welcome, <Link to={"/account"}>{state?.user?.email}</Link>
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setToggleModal(true)}
            className="rounded-md px-3 py-1 bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white text-xs sm:text-sm"
          >
            New
          </button>
          {state.isLogin ? (
            <button
              onClick={handleLogout}
              className="rounded-md px-3 py-1 bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 text-white text-xs sm:text-sm"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="rounded-md px-3 py-1 bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 text-white text-xs sm:text-sm"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {toggleModal && (
        <UploadModal
          onClose={() => setToggleModal(false)}
          onToggleModal={setToggleModal}
        />
      )}
    </header>
  );
};

export default Header;
