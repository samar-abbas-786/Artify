import React from "react";

const Footer = () => {
  let x = new Date();
  let year = x.getFullYear();
  return (
    <div className="h-16 text-sm items-center font-poppins w-full tracking-widest justify-center bg-white flex ">
      Copyright &copy; {year} Artify ❤️
    </div>
  );
};

export default Footer;
