import React from "react";
import Navbar from "../Navbar/navbar";
import { FaWhatsapp } from "react-icons/fa";

const About = () => {
  return (
    <>
      <Navbar />
      <section className="py-12 bg-gray-100 pb-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2">
              <img
                src="https://media.istockphoto.com/id/1530807718/photo/young-latin-woman-artist-selling-her-art-at-outdoor-market.webp?a=1&b=1&s=612x612&w=0&k=20&c=UpGZYHhszKH0yx08qrgmD_7Gt3t2vUeS2u93zG5X4YA=" // Replace with your image URL
                alt="Shaziya - Artist"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2 md:pl-12 mt-8 md:mt-0">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                About Me
              </h2>
              <p className="text-gray-600 mb-4">
                Hello! I'm Shaziya, a passionate artist who loves to create
                handmade paintings. My journey in the world of art began at a
                young age, and since then, I have been exploring various mediums
                and styles to express my creativity.
              </p>
              <p className="text-gray-600 mb-4">
                Each of my paintings is a unique piece of art, crafted with love
                and attention to detail. I draw inspiration from nature,
                emotions, and the world around me, which reflects in my work.
              </p>
              <p className="text-gray-600 mb-4">
                Through my website, I aim to share my art with the world and
                connect with fellow art enthusiasts. I hope my paintings bring
                joy and inspiration to your life.
              </p>
              <a
                href="https://wa.me/+919997405528"
                className="contact-btn flex gap-3 items-center"
              >
                <FaWhatsapp className="text-[30px] text-green-600" />
                <p className="font-poppins font-[600] text-slate-950">
                  +91 9997405528
                </p>
              </a>
              {/* <a
                href="#contact" // Replace with your contact section link
                className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Contact Me
              </a> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
