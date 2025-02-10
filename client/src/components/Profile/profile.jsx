import React, { useState } from "react";
import Navbar from "../Navbar/navbar";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import BottomNavbar from "../Navbar/bottom-nav";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [mode, setMode] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = async () => {
    await axios.get("https://artify-backend-p679.onrender.com/api/user/Logout");
    localStorage.clear();
    toast("Logout Successfully");
    navigate("/Login");
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const userID = user?._id;

  const UploadPainting = async () => {
    if (!name || !price || !mode || !file) {
      toast.error("Please fill in all the fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("mode", mode);
    formData.append("userID", userID);
    formData.append("image", file);

    try {
      const response = await axios.post(
        "https://artify-backend-p679.onrender.com/api/painting/uploadPainting",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      handleModalClose();
      toast.success(response.data.message);
      setFile(null);
      setMode("");
      setName("");
      setPrice("");
    } catch (error) {
      console.error("Error uploading painting", error);
      toast.error("Error uploading painting");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-[#D5EAEC] flex flex-col">
      <Navbar />
      <div className="flex flex-col md:flex-row justify-center items-center flex-1 px-5 py-10 gap-6 md:gap-12 lg:gap-16 pb-32">
        <div className="w-full sm:w-[60vw] md:w-[30vw] bg-white rounded-xl shadow-xl border border-gray-300 flex flex-col items-center p-6 md:p-8 space-y-6">
          <div className="bg-gradient-to-r from-indigo-500 to-blue-400 p-5 rounded-full shadow-lg">
            <FaUser color="white" size={60} />
          </div>
          <div className="text-lg text-gray-800 font-semibold space-y-4 text-center md:text-left">
            <div>
              <b>👤 Name:</b> {user?.username}
            </div>
            <div>
              <b>📧 Email:</b> {user?.email}
            </div>
            {user && (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            )}
          </div>
        </div>

        <div className="w-full sm:w-[30vw] md:w-[20vw] bg-white rounded-xl shadow-xl border border-gray-300 flex flex-col items-center p-6 space-y-4">
          <Link
            to="/Add-To-Cart"
            className="text-blue-600 font-semibold text-lg hover:text-blue-800 transition"
          >
            🛒 My Cart
          </Link>
          <Link
            to="/MyOrder"
            className="text-purple-600 font-semibold text-lg hover:text-purple-800 transition"
          >
            📦 My Orders
          </Link>
        </div>

        {user?.role === "admin" && (
          <div className="w-full sm:w-[30vw] md:w-[20vw] bg-white rounded-xl shadow-xl p-6 flex flex-col items-center space-y-4">
            <h1 className="text-xl font-bold text-gray-800">Admin Section</h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800 transition"
            >
              Upload New Painting
            </button>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-[90%] sm:w-[400px] p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Add New Painting
            </h2>
            <input
              type="file"
              className="w-full border px-3 py-2 rounded-md mb-4"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <input
              type="text"
              className="w-full border px-3 py-2 rounded-md mb-4"
              placeholder="Enter Painting Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="number"
              className="w-full border px-3 py-2 rounded-md mb-4"
              placeholder="Enter Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <FormControl component="fieldset">
              <FormLabel>Select Mode</FormLabel>
              <RadioGroup
                value={mode}
                onChange={(e) => setMode(e.target.value)}
              >
                <FormControlLabel
                  value="portrait"
                  control={<Radio />}
                  label="Portrait"
                />
                <FormControlLabel
                  value="landscape"
                  control={<Radio />}
                  label="Landscape"
                />
              </RadioGroup>
            </FormControl>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={UploadPainting}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add Painting
              </button>
              <button
                onClick={handleModalClose}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="block md:hidden">
        <BottomNavbar />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Profile;
