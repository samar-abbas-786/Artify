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
import BottomNavbar from "../Navbar/bottom-nav";

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

  useEffect(() => {
    const getAddedCart = async () => {
      try {
        const response = await axios.get(
          `/api/cart/getAddtocart?userID=${user._id}`
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

    const getAddresses = async () => {
      try {
        const response = await axios.get(
          `/api/address/getAddressForUser?userID=${user._id}`
        );
        setGetAddress(response.data.getAddress);
      } catch (error) {
        toast.error("Error fetching addresses: " + error.message);
      }
    };

    getAddedCart();
    getAddresses();
  }, []);

  const handleRemoveFromCart = async (id) => {
    try {
      await axios.get(
        `/api/cart/RemovefromCart?paintingID=${id}&userID=${user._id}`
      );
      setAdded((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handlePlaced = async (paintingID) => {
    if (!selectedAddress) {
      toast.error("Please select an address before placing an order.");
      return;
    }
    try {
      const response = await axios.post("/api/order/createOrder", {
        paintingID,
        quantity: quantities,
        userID: user._id,
        addressID: selectedAddress._id,
      });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100 md:pb-10 pb-32 w-full">
      <Navbar />
      <div className="w-full flex justify-center mt-8 items-center">
        <h1 className="flex items-center gap-2 text-3xl font-bold text-gray-800">
          <GiBeachBag className="text-4xl" /> My Cart
        </h1>
      </div>
      <div className="flex flex-col lg:flex-row justify-between px-5 w-full">
        <div className="w-full lg:w-2/3 flex flex-col items-center p-4">
          {added.length === 0 ? (
            <p className="text-xl text-gray-600 mt-8">Your cart is empty.</p>
          ) : (
            added.map((item) => (
              <div
                key={item._id}
                className="w-full max-w-4xl flex flex-col lg:flex-row justify-between items-center bg-white border rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 mt-4 p-4"
              >
                <img
                  className="w-32 h-32 lg:w-56 lg:h-56 object-cover"
                  src={`http://localhost:8080/uploads/${item.image}`}
                  alt="Product"
                />
                <div className="flex-1 flex flex-col justify-center p-6 text-center lg:text-left">
                  <p className="text-xl font-semibold">{item.name}</p>
                  <p className="text-lg font-bold text-green-600">
                    ₹{item.price}
                  </p>
                </div>
                <div className="w-full lg:w-64 flex flex-col items-center space-y-4 p-4">
                  <input
                    placeholder="Quantity"
                    onChange={(e) => setQuantities(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                    type="number"
                    min="1"
                  />
                  <div className="flex flex-col lg:flex-row gap-4 w-full">
                    <button
                      onClick={() => handleRemoveFromCart(item._id)}
                      className="w-full lg:w-auto px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => handlePlaced(item._id)}
                      className="w-full lg:w-auto px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="w-full lg:w-1/3 px-3 flex flex-col items-center rounded-md bg-white p-4">
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
            className="p-1 bg-orange-400 px-2 py-1 rounded-sm mt-2"
          >
            Add Address
          </button>
        </div>
      </div>
      <div className="block md:hidden">
        <BottomNavbar />
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddToCart;
