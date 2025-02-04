import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/navbar";

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  const getMyOrder = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/order/getMyOrder?userID=${user._id}`
      );
      console.log(response.data);
      setOrders(response.data.flattenedPaintings);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyOrder();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-100 flex flex-col items-center p-6">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 drop-shadow-lg tracking-wide">
          📦 My Orders
        </h1>

        {loading ? (
          <div className="flex items-center justify-center min-h-[300px]">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : orders.length === 0 ? (
          <p className="text-gray-500 text-lg">No orders found.</p>
        ) : (
          <div className="w-full max-w-5xl flex flex-col gap-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex items-center bg-white/90 backdrop-blur-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 p-4 w-full"
              >
                {/* Order Image */}
                <img
                  src={`http://localhost:8080/uploads/${order?.image}`}
                  alt={order.name}
                  className="w-24 h-24 rounded-lg shadow-md object-cover"
                />

                {/* Order Details */}
                <div className="ml-6 flex-1">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {order.name}
                  </h2>
                  <p className="text-lg text-gray-600 font-semibold">
                    ₹ {order.price}
                  </p>
                  <p className="text-sm text-gray-500">📅 {order.orderDate}</p>
                </div>

                {/* Order Status */}
                <span
                  className={`px-5 py-2 rounded-full text-sm font-semibold uppercase tracking-wide ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-600"
                      : order.status === "Shipped"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {order.mode}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyOrder;
