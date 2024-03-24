import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Keyboard, Pagination, Navigation } from "swiper/modules";

import { useAuth } from "./context/authContext";

const ImageShow = ({ images }) => {
  const { state, getImages } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const img = images?.find((img) => img.id === id);
  const initialImage = images.indexOf(img);

  useEffect(() => {
    if (!state.isLogin) navigate("/login");
  }, [state.isLogin]);

  return (
    <div className="relative w-full h-full bg-gray-800 py-1">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center justify-center absolute top-2 left-2 z-10 rounded-full w-10 h-10 text-3xl bg-gray-700 text-white focus:outline-none shadow-md hover:bg-gray-600 transition duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <Swiper
        slidesPerView={1}
        keyboard={{
          enabled: true,
        }}
        pagination={{
          clickable: true,
          type: "fraction",
        }}
        loop={true}
        initialSlide={initialImage}
        navigation={true}
        modules={[Keyboard, Pagination, Navigation]}
        className="h-[98.7vh] "
      >
        {images?.map((image, index) => (
          <SwiperSlide
            key={index}
            className=" flex align-middle justify-center"
          >
            <img src={image.image} alt="s" className="h-full object-cover " />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageShow;
