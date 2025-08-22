import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCheck } from "react-icons/fa";

const Allorders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({});

  // Fetch Orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          "https://bookstore-backend-y2rz.onrender.com/api/v1/getAllOrders",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setOrders(data.data);
      } catch (error) {
        console.error("Error fetching orders:", error.response?.data || error.message);
      }
    };
    fetchOrders();
  }, []);

  // Handle status update
  const handleStatusUpdate = async (orderId, index) => {
    try {
      const token = localStorage.getItem("token");
      const newStatus = selectedStatus[orderId];

      await axios.patch(
        `https://bookstore-backend-y2rz.onrender.com/api/v1/updateOrderbyAdmin/${orderId}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // ✅ frontend update
      const updatedOrders = [...orders];
      updatedOrders[index].status = newStatus;
      setOrders(updatedOrders);
    } catch (error) {
      console.error("Error updating status:", error.response?.data || error.message);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">All Orders</h2>
      <div className="space-y-4">
        {orders.map((item, index) => (
          <div
            key={item._id}
            className="bg-gray-900 text-white p-4 rounded-lg shadow-md"
          >
            {/* Main Row */}
            <div className="flex justify-between items-center">
              {/* Order Info */}
              <div>
                <p className="font-semibold">Order ID: {item._id}</p>
                <p>Book: {item.book?.title}</p>
                <p>Current Status: {item.status}</p>
              </div>

              {/* Status Dropdown + Save Button */}
              <div className="flex items-center gap-2">
                <select
                  name="status"
                  value={selectedStatus[item._id] || item.status}
                  onChange={(e) =>
                    setSelectedStatus({
                      ...selectedStatus,
                      [item._id]: e.target.value,
                    })
                  }
                  className="bg-gray-800 px-2 py-1 rounded"
                >
                  {["order placed", "out of delivery", "Delivered", "Canceled"].map(
                    (status, idx) => (
                      <option value={status} key={idx}>
                        {status}
                      </option>
                    )
                  )}
                </select>

                <button
                  onClick={() => handleStatusUpdate(item._id, index)}
                  className="bg-green-600 p-2 rounded-full hover:bg-green-700"
                >
                  <FaCheck />
                </button>
              </div>
            </div>

            {/* User Details */}
            <div className="mt-3 border-t border-gray-700 pt-2 text-sm">
              <p className="font-semibold">User Details:</p>
              <p>Name: {item.user?.name}</p>
              <p>Email: {item.user?.email}</p>
              <p>Phone: {item.user?.phone}</p>
              <p>Address: {item.user?.address}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Allorders;

