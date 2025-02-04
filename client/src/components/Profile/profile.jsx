import React from "react";
import Navbar from "../Navbar/navbar";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-[#D5EAEC] flex flex-col">
      <Navbar />
      <div className="flex justify-center items-center flex-1 px-5 py-10 space-x-9">
        <div className="h-[60vh] w-[30vw] bg-white rounded-lg shadow-lg border border-gray-300 flex flex-col justify-evenly items-center p-6">
          <div className="bg-gradient-to-r from-slate-800 to-slate-500 p-5 rounded-full shadow-md">
            <FaUser color="white" size={55} />
          </div>

          <div className="font-inter text-lg text-gray-700 font-semibold flex flex-col justify-evenly h-[60%] gap-3">
            <div>
              <b className="text-gray-900">👤 Name :</b> {user.username}
            </div>
            <div>
              <b className="text-gray-900">📧 Email :</b> {user.email}
            </div>
          </div>
        </div>

        {/* Right Box */}
        <div className="w-[20vw] h-[30vh] bg-white rounded-lg shadow-lg border border-gray-300 flex flex-col items-center justify-evenly p-6">
          <Link
            to="/Add-To-Cart"
            className="text-blue-600 font-medium text-lg hover:text-blue-800 transition duration-200"
          >
            🛒 My Cart
          </Link>
          <Link
            to="/MyOrder"
            className="text-purple-600 font-medium text-lg hover:text-purple-800 transition duration-200"
          >
            📦 My Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
