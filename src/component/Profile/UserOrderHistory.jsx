import axios from 'axios';
import React, { useEffect, useState } from 'react'

const UserOrderHistory = () => {
  const [historydata, setHistory] = useState([]);
  const id = localStorage.getItem("id");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(
          "https://bookstore-backend-y2rz.onrender.com/api/v1/getOrderHistory",
          {
             params: { id },// send id as query param
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
          
        );
        console.log(response);
        setHistory(response.data.data);
      } catch (error) {
        console.error("Can't fetch data", error);
      }
    };

    fetchHistory();
  }, []);

  // const handleRemove = (bookId) => {
  //   setFavdata(prev => prev.filter(book => book._id !== bookId))
  // }

  return (
   <div className="w-full min-h-screen bg-zinc-700 p-6">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Your Orders</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {historydata.length > 0 ? (
          historydata.map((order, index) => (
            <div key={index} className="bg-zinc-900 shadow-md rounded-lg p-4 flex flex-col">
              
              {/* Book Image */}
              <img
                src={order.book.url}
                alt={order.book.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              
              {/* Book Info */}
              <h2 className="text-lg font-semibold text-white">{order.book.title}</h2>
              <p className="text-gray-600 mb-2 text-yellow-600">Author: {order.book.author}</p>
              <p className="text-green-600 font-bold mb-2">₹ {order.book.price}</p>
              
              {/* Order Status */}
              <p className={`font-semibold mb-2 ${
                order.status === "order placed" ? "text-blue-500" :
                order.status === "delivered" ? "text-green-500" :
                order.status === "cancelled" ? "text-red-500" : "text-orange-500"
              }`}>
                Status: {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </p>

              {/* Order Date */}
              <p className="text-gray-200 text-sm ">
                Ordered on: {new Date(order.createdAt).toLocaleDateString()}
              </p>
              
              {/* Optional: Track / Cancel Button */}
              <div className="mt-4 flex gap-2">
                <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-1 rounded-md text-sm">
                  Track Order
                </button>
                {order.status === "order placed" && (
                  <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-1 rounded-md text-sm">
                    Cancel
                  </button>
                )}
              </div>

            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full">No orders found</p>
        )}
      </div>
    </div>
  );
};

export default UserOrderHistory
