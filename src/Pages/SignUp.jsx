import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [confirmpassword, setConfirmPassword] = useState('')
  const [address, setAddress] = useState('')
  const [agree, setAgree] = useState(false)
  const navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(name, email, password, address, agree);

    try {
      const res = await axios.post("https://bookstore-backend-y2rz.onrender.com/api/v1/signup", {
        username: name,
        email,
        password,
        // confirmPassword: confirmpassword, (backend must support this if needed)
        address: address,
      });
      console.log(res.data);
      alert('Registration successful!');
      navigate("/login")
    } catch (err) {
      console.error(err);
      alert('Registration failed!');
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
      <div className="w-full max-w-md p-8 bg-zinc-800 rounded-2xl shadow-lg border border-zinc-700">
        
        {/* Header */}
        <h1 className="text-3xl font-bold text-center mb-4 text-yellow-400 tracking-wide">
          Create an Account
        </h1>
        <p className="text-center text-gray-400 mb-8">
          Join Book Ocean and start your journey 📖
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">Name</label>
            <input
              className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-zinc-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              type="text"
              placeholder="Enter your name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">Email</label>
            <input
              className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-zinc-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">Password</label>
            <input
              className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-zinc-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">Confirm Password</label>
            <input
              className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-zinc-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              type="password"
              placeholder="Confirm your password"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">Address</label>
            <textarea
              className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-zinc-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter your address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              className="mr-2 accent-yellow-400"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            <label className="text-gray-300 text-sm">
              I agree to the <span className="text-yellow-400 hover:underline cursor-pointer">Terms & Conditions</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 text-white font-semibold rounded-lg shadow-md transition duration-300 ${
              agree
                ? "bg-yellow-400 text-zinc-900 hover:bg-yellow-500"
                : "bg-gray-500 cursor-not-allowed"
            }`}
            disabled={!agree}
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-yellow-400 font-medium hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  )
}

export default SignUp
