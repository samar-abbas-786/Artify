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
const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [mode, setMode] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const userID = JSON.parse(localStorage.getItem("user"))._id; // Ensure you're using the correct user ID

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
        "http://localhost:8080/painting/uploadPainting",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log("Response", response.data.message);
      handleModalClose();

      toast.success(response.data.message);
      setFile("");
      setMode("");
      setName("");
      setPrice("");
    } catch (error) {
      console.error("Error uploading painting", error);
      toast.error(error.messsage);
      setFile("");
      setMode("");
      setName("");
      setPrice("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-[#D5EAEC] flex flex-col">
      <Navbar />
      <div className="flex justify-center items-center flex-1 px-5 py-10 space-x-9 md:space-x-16 lg:space-x-24">
        <div className="h-auto w-[90vw] sm:w-[60vw] md:w-[30vw] bg-white rounded-xl shadow-2xl border border-gray-300 flex flex-col justify-evenly items-center p-8 md:p-10 space-y-6">
          <div className="bg-gradient-to-r from-indigo-500 to-blue-400 p-5 rounded-full shadow-xl">
            <FaUser color="white" size={60} />
          </div>

          <div className="font-inter text-lg text-gray-800 font-semibold flex flex-col justify-evenly h-[60%] gap-4">
            <div>
              <b className="text-gray-900">👤 Name:</b> {user.username}
            </div>
            <div>
              <b className="text-gray-900">📧 Email:</b> {user.email}
            </div>
          </div>
        </div>

        <div className="w-[80vw] sm:w-[30vw] md:w-[20vw] h-auto bg-white rounded-xl shadow-2xl border border-gray-300 flex flex-col items-center justify-evenly p-6 space-y-4">
          <Link
            to="/Add-To-Cart"
            className="text-blue-600 font-semibold text-lg hover:text-blue-800 transition duration-300 ease-in-out transform hover:scale-105"
          >
            🛒 My Cart
          </Link>
          <Link
            to="/MyOrder"
            className="text-purple-600 font-semibold text-lg hover:text-purple-800 transition duration-300 ease-in-out transform hover:scale-105"
          >
            📦 My Orders
          </Link>
        </div>

        {user && user.role === "admin" && (
          <div className="admin p-4 mt-8 bg-white rounded-xl shadow-lg w-[80vw] sm:w-[30vw] md:w-[20vw] flex flex-col justify-evenly items-center space-y-4">
            <h1 className="font-poppins text-xl font-bold text-gray-800">
              Admin Section
            </h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2 rounded-md bg-lime-700 text-white text-lg hover:bg-lime-800 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Upload New Painting
            </button>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-[400px] p-6 rounded-lg shadow-lg transform transition-all duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Add New Painting
            </h2>
            <input
              type="file"
              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
              placeholder="Enter the Name of Painting"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
              placeholder="Enter Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <div className="mb-4">
              <FormControl component="fieldset">
                <FormLabel component="legend">Select Mode</FormLabel>
                <RadioGroup
                  aria-label="mode"
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  name="mode"
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
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={UploadPainting}
                className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Add Painting
              </button>
              <button
                onClick={handleModalClose}
                className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Profile;
