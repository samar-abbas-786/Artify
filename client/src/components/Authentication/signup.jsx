import React, { useState } from "react";
import Navbar from "../Navbar/navbar";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import BottomNavbar from "../Navbar/bottom-nav";

const SignUp = () => {
  const [user, SetUser] = useState({});
  const [name, setName] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const naviagate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await axios.post(
        "https://artify-backend-ra4w.onrender.com/api/user/Signup",
        {
          username: name,
          email,
          password,
        }
      );

      console.log(response.data);
      localStorage.setItem("user", JSON.stringify(response.data.newUser));
      toast.success(response.data.message);
      naviagate("/Login");
    } catch (error) {
      console.log("Error occured in Signup", error);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="w-screen h-[85vh] flex justify-center items-center bg-gradient-to-r from-gray-100 to-gray-200">
        <div className="form w-[90%] sm:w-[30vw] p-6 bg-white shadow-lg rounded-xl flex flex-col items-center gap-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Create an Account
          </h1>

          <input
            className="h-12 w-full px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
          />

          <input
            className="h-12 w-full px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            placeholder="Email Address"
          />

          <input
            className="h-12 w-full px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />

          <button
            onClick={handleSignup}
            className="w-full h-12 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-300"
          >
            Sign Up
          </button>

          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to={"/Login"}
              className="text-green-500 hover:underline cursor-pointer"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
      <BottomNavbar />
    </div>
  );
};

export default SignUp;
