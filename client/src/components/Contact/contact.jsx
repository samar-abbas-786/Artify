import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name || !email || !contact || !message) {
      toast.info("All Fields Are Required");
    }
    try {
      const response = await axios.post("/api/contact/PostQuery", {
        name,
        email,
        contact,
        message,
      });

      console.log(response.data);
      toast.success(response.data.message);
    } catch (error) {
      console.log("Error on handle message on contact", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center  h-max pb-20  md:min-h-screen  p-6">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-xl p-8 relative overflow-hidden">
        <h1 className="text-4xl font-bold mb-6 text-gray-800 text-center">
          Contact Us
        </h1>
        <p className="text-center text-gray-600 mb-10">
          We would love to hear from you! Fill in your details below and we'll
          get back to you as soon as possible.
        </p>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Name */}
          <div className="relative group">
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder=" "
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
            <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all group-focus-within:top-0 group-focus-within:text-blue-500">
              Your Name
            </label>
          </div>

          {/* Email */}
          <div className="relative group">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
            <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all group-focus-within:top-0 group-focus-within:text-blue-500">
              Your Email
            </label>
          </div>

          {/* Phone */}
          <div className="relative group">
            <input
              type="number"
              name="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder=" "
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
            <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all group-focus-within:top-0 group-focus-within:text-blue-500">
              Phone Number
            </label>
          </div>

          {/* Message */}
          <div className="relative group md:col-span-2">
            <textarea
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder=" "
              rows="4"
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            ></textarea>
            <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all group-focus-within:top-0 group-focus-within:text-blue-500">
              Your Message
            </label>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="px-8 py-2 bg-orange-500 text-white text-lg font-bold rounded-sm shadow-md hover:bg-orange-600 transition-all duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Contact;
