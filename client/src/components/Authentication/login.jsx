import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/navbar";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BottomNavbar from "../Navbar/bottom-nav";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://artify-uj97.onrender.com/api/user/Login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      console.log(response.data);
      localStorage.setItem("user", JSON.stringify(response.data.existing));
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      console.log("Error occurred in Login", error);
      toast.error(error.response?.data?.message || "Login failed");
      localStorage.clear("user");
      navigate("/Login");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="w-screen h-[85vh] flex justify-center items-center bg-gradient-to-r from-gray-100 to-gray-200">
        <div className="form w-[90%] sm:w-[30vw] p-6 bg-white shadow-lg rounded-xl flex flex-col items-center gap-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Login Your Account
          </h1>

          <input
            className="h-12 w-full px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
          />

          <input
            className="h-12 w-full px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            placeholder="Password"
          />

          <button
            type="submit"
            onClick={handleLogin}
            className="w-full h-12 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-300"
          >
            Login
          </button>

          <p className="text-sm text-gray-600">
            Create an New Account?{" "}
            <Link
              to={"/SignUp"}
              className="text-green-500 hover:underline cursor-pointer"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
      <div className="md:hidden">
        <BottomNavbar />
      </div>
    </div>
  );
};

export default Login;
