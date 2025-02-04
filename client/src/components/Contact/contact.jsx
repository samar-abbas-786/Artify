import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for contacting us!");
    setFormData({ name: "", email: "", phone: "", message: "" });
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
              value={formData.name}
              onChange={handleChange}
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
              value={formData.email}
              onChange={handleChange}
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
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
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
              value={formData.message}
              onChange={handleChange}
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
    </div>
  );
};

export default Contact;
