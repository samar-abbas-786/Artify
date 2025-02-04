import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/navbar";
import axios from "axios";
import { GiBeachBag } from "react-icons/gi";
import { ToastContainer, toast } from "react-toastify";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const AddToCart = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [added, setAdded] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState();
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [getAddress, setGetAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  // Fetch Cart Items
  console.log(selectedAddress);

  const getAddedCart = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/cart/getAddtocart?userID=${user._id}`
      );
      if (response.data) {
        setAdded(response.data.flattenedPaintings);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleremovefromcart = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/cart/RemovefromCart?paintingID=${id}&userID=${user._id}`
      );
      toast(response.data.message);
      setAdded((prev) => prev.filter((item) => item._id !== id));
      window.location.reload(false);
    } catch (error) {
      toast(error.message);
    }
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
    setAddress(""); // Clear input fields
    setPincode("");
  };

  // Place Order
  const handlePlaced = async (paintingID) => {
    if (!selectedAddress) {
      toast.error("Please select an address before placing an order.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/order/createOrder",
        {
          paintingID,
          quantity: quantities,
          userID: user._id,
          addressID: selectedAddress._id,
        }
      );
      // console.log("Clicked Placed");
      console.log(response.data);

      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Fetch Addresses
  const getAddresses = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/address/getAddressForUser?userID=${user._id}`
      );
      setGetAddress(response.data.getAddress);
      // toast.success(response.data.message);
    } catch (error) {
      toast.error("Error fetching addresses: " + error.message);
    }
  };

  const handleAddAddress = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/address/createAddress",
        {
          address,
          pincode,
          userID: user._id,
        }
      );
      // setGetAddress((prev) => [...prev, response.data.newAddress]);
      setAddress(response.data.getAddress);
      toast.success(response.data.message);
      setIsModalOpen(false);
      window.location.reload(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAddedCart();
    getAddresses();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100 pb-10 w-[100vw] ">
      <Navbar />

      <div className="w-full flex justify-center mt-8 items-center">
        <h1 className="flex items-center gap-2 text-3xl font-bold text-gray-800">
          <GiBeachBag className="text-4xl" />
          My Cart
        </h1>
      </div>

      <div className="flex justify-between px-5 w-[100vw] ">
        <div className="w-[80%] flex flex-col justify-center items-center p-4">
          {added.length === 0 ? (
            <p className="text-xl text-gray-600 mt-8">Your cart is empty.</p>
          ) : (
            added.map((item) => (
              <div
                key={item._id}
                className="w-full max-w-4xl flex justify-between items-center bg-white border rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 mt-4"
              >
                <img
                  className="w-56 h-56 object-cover"
                  src={`http://localhost:8080/uploads/${item.image}`}
                  alt="Product"
                />

                <div className="flex-1 flex flex-col justify-center p-6">
                  <p className="text-xl font-semibold">{item.name}</p>
                  <p className="text-lg font-bold text-green-600">
                    ₹{item.price}
                  </p>
                </div>

                <div className="w-64 flex flex-col items-center space-y-4 p-4">
                  <input
                    placeholder="Quantity"
                    onChange={(e) => setQuantities(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                    type="number"
                    min="1"
                  />
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleremovefromcart(item._id)}
                      className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => handlePlaced(item._id)}
                      className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="w-[30vw] px-3 flex flex-col items-center  rounded-md bg-white">
          <FormLabel>Select Address</FormLabel>
          <FormControl component="fieldset">
            <RadioGroup
              value={selectedAddress?.address || ""}
              onChange={(e) => {
                const selected = getAddress.find(
                  (addr) => addr.address === e.target.value
                );
                setSelectedAddress(selected);
              }}
            >
              {getAddress.map((addr) => (
                <FormControlLabel
                  key={addr._id}
                  value={addr.address}
                  control={<Radio />}
                  label={`${addr.address}, ${addr.pincode}`}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <button
            onClick={() => setIsModalOpen(true)}
            className="p-1 bg-orange-400 px-2 py-1 rounded-sm"
          >
            Add Address
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-[400px] p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Add Address
            </h2>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
              placeholder="Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={handleAddAddress}
                className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Add Address
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

export default AddToCart;
