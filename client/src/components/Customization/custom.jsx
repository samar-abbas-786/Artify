import React from "react";
import { FiArrowRight } from "react-icons/fi";
import customimage from "../../assets/custom3.avif";
import "../../App.css";

const Custom = () => {
  return (
    <div className="p-10 pb-1 h-full w-full block1 md:py-16 bg-gradient-to-r from-indigo-50 from-10% via-sky-50 via-30% to-emerald-50 to-90%">
      <h1 className="font-poppins text-2xl text-gray-800 flex items-center space-x-2 mb-8 ">
        <span>Customization: Tailor Your Space to Perfection</span>
        <FiArrowRight className="" />
      </h1>

      <div className="flex flex-col md:flex-row justify-between pb-2 md:pb-2 items-center md:mt-16">
        <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
          <img
            className="md:w-3/5  h-auto rounded-sm aspect-square  hover:scale-105 transform transition-all duration-300"
            src={customimage}
            alt="Customization Preview"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col space-y-6">
          <p className="text-gray-700 text-md font-thin  leading-relaxed">
            At Artify, we believe that your space should reflect your unique
            personality. With our customization services, you can transform your
            home or office with bespoke designs tailored specifically for you.
            From altering colors and sizes to creating entirely new designs, the
            possibilities are endless.
          </p>
          <p className="text-gray-700 text-md font-thin leading-relaxed">
            Choose from high-quality materials, exclusive finishes, and precise
            dimensions to ensure every piece fits your vision perfectly. Our
            expert designers work with you at every step to create pieces that
            seamlessly blend with your space.
          </p>
          <p className="text-gray-700 text-md font-thin leading-relaxed">
            Whether it’s a statement piece for your living room, a custom mural,
            or personalized furniture, we’re here to bring your ideas to life.
          </p>

          <button className="bg-orange-400 text-white px-6 py-3 rounded-sm shadow-md hover:bg-orange-500 hover:shadow-lg transform transition-all duration-300 self-start">
            Start Your Customization Journey
          </button>
        </div>
      </div>
    </div>
  );
};

export default Custom;
