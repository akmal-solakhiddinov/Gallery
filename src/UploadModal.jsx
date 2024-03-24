import React, { useState } from "react";
import { useAuth } from "./context/authContext";

const UploadModal = ({ onToggleModal }) => {
  const { state, uploadImage } = useAuth();
  const [file, setFile] = useState(null);

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (file) {
      uploadImage(file);
    }
    onToggleModal(false);
    setFile(null);
  };

  const handleCLear = () => {
    setFile(null);
    onToggleModal(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-40 ">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-lg font-semibold mb-4">Upload Image</h2>
        <form onSubmit={handleSubmitFile}>
          <div className="mb-4">
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="border border-gray-300 px-4 py-2 w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
          >
            {state.isLoading ? "Uploading..." : "Upload"}
          </button>
          <button
            type="button"
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            onClick={handleCLear}
          >
            Clear
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadModal;
