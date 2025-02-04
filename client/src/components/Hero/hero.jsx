import React from "react";
import image from "../../assets/paint.avif";
import { useNavigate } from "react-router-dom";
import "../../App.css";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="top flex flex-col-reverse md:flex-row">
      <div className="left-img w-full md:w-[50vw]">
        <img
          className="w-full h-[50vh] md:h-[85vh] object-fill "
          src={image}
          alt="New Collection"
        />
      </div>
      <div className="right-text w-full md:w-[50vw] h-[55vh] md:h-[85vh] bg-[#D5EAEC] flex flex-col justify-center pl-8 md:pl-20 text-center md:text-left">
        <p className="font-light italic text-lg tracking-widest mb-4">
          New Collection
        </p>
        <h1 className="italic font-bold font-serif text-[#292f2f] text-3xl md:text-[60px] leading-tight mb-6">
          STYLE <br /> YOUR <br /> WALLS
        </h1>
        <button
          onClick={() => navigate("/products")}
          className="bg-[#F8A888] md:w-[200px] w-[150px] mx-auto md:mx-0 font-poppins md:ml-9 rounded-sm hover:bg-opacity-50 px-6 md:py-3 py-2 "
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Hero;
