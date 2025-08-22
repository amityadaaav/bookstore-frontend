import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Trash2 } from "lucide-react"
import Loader from '../component/Loader/Loader'
import { Link, useNavigate } from 'react-router-dom'

const Cart = () => {
  const [cartdata, setCartdata] = useState([])
  const id = localStorage.getItem("id")
  const navigate = useNavigate()

  // Remove cart item
  const handleRemove = async (bookid) => {
    try {
      const response = await axios.put(
        "https://bookstore-backend-y2rz.onrender.com/api/v1/deleteBookcart",
        { id, bookid },
        { headers: { authorization: `Bearer ${localStorage.getItem("token")}` } }
      )
      alert("Removed from cart")
      setCartdata((prev) => prev.filter((item) => item._id !== bookid))
    } catch (error) {
      console.error("Cannot remove from cart", error)
    }
  }

  // Place order
  const handlePlaceOrder = async () => {
    try {
      await axios.post(
        `https://bookstore-backend-y2rz.onrender.com/api/v1/orderPlace/${id}`,
        { order: cartdata },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      )
      alert("Order placed successfully")
      setCartdata([])
      navigate("/profile/orderHistory")
    } catch (error) {
      console.error("Can't place order", error)
    }
  }

  // Fetch cart
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(
          "https://bookstore-backend-y2rz.onrender.com/api/v1/getBookcart",
          {
            params: { id },
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
          }
        )
        setCartdata(response.data.data)
      } catch (error) {
        console.error("Can't fetch data", error)
      }
    }
    fetchCart()
  }, [id])

  return (
    <div className="bg-zinc-900 min-h-screen px-4 py-8 text-white">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side - Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {!cartdata ? <Loader /> : null}
          {cartdata && cartdata.length > 0 ? (
            cartdata.map((ele, i) => (
              <div
                key={i}
                className="flex items-center bg-zinc-800 shadow-lg rounded-2xl p-4 hover:scale-105 transform transition"
              >
                {/* Image */}
                <Link >
                  <img
                    src={ele.url}
                    alt={ele.title}
                    className="w-28 h-28 object-cover rounded-lg border border-yellow-500"
                  />
                </Link>

                {/* Details */}
                <div className="ml-6 flex-1">
                  <Link>
                    <h2 className="text-xl font-semibold text-yellow-100">{ele.title}</h2>
                  </Link>
                  <p className="text-gray-300 mt-1">Author: {ele.author}</p>
                  <p className="text-green-400 font-bold text-lg mt-2">₹ {ele.price}</p>

                  {/* Actions */}
                  <button
                    onClick={() => handleRemove(ele._id)}
                    className="flex items-center mt-3 text-red-500 hover:text-red-700 bg-red-100 px-3 py-1 rounded-lg font-medium transition"
                  >
                    <Trash2 size={18} className="mr-2" /> Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 mt-10 text-lg">
              No items in cart
            </p>
          )}
        </div>

        {/* Right Side - Price Details */}
        <div className="bg-zinc-800 shadow-lg rounded-2xl p-6 border border-yellow-500 h-fit">
          <h2 className="text-xl font-bold text-yellow-400 border-b pb-2 mb-4">
            Price Details
          </h2>

          <div className="flex justify-between mb-2 text-gray-300">
            <span>Price ({cartdata.length} items)</span>
            <span className="text-green-400">
              ₹{cartdata.reduce((total, item) => total + (item.price || 0), 0)}
            </span>
          </div>

          <div className="flex justify-between mb-2 text-gray-300">
            {/* Discount can be added here */}
          </div>

          <div className="flex justify-between mt-3 font-semibold text-yellow-400 text-lg">
            <span>Total Amount</span>
            <span className="text-green-400">
              ₹{cartdata.reduce((total, item) => total + (item.price || 0), 0)}
            </span>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full mt-6 bg-yellow-500 text-zinc-900 py-2 rounded-xl font-semibold hover:bg-yellow-600 transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart
