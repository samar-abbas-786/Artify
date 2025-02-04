import React from "react";
import Navbar from "../components/Navbar/navbar";
import Hero from "../components/Hero/hero";
import NewArrival from "../components/New Arrivals/new-arrival";
import Custom from "../components/Customization/custom";
import BottomNavbar from "../components/Navbar/bottom-nav";
import "../App.css";
import Contact from "../components/Contact/contact";
import Footer from "../components/Footer/footer";
// window.addEventListener("scroll", () => {
//   document.getElementById("scr").style.visibility = "hidden";
// });

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <NewArrival />
      <Custom />
      <div id="scr" className="md:hidden block md:pt-[100px]  ">
        {" "}
        <BottomNavbar />
      </div>
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
