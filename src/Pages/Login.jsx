import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { authActions } from "../Store/auth"
import { useDispatch } from 'react-redux'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    //console.log(email, password);
    try {
      const res = await axios.post('https://bookstore-backend-y2rz.onrender.com/api/v1/signin', {
        email,
        password,
      });

      dispatch(authActions.login())
      dispatch(authActions.changeRole(res.data.role))
      localStorage.setItem("id", res.data.id)
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("role", res.data.role)

      alert('Login successful!');
      navigate("/profile")
    } catch (err) {
      console.error(err);
      alert('Login failed!');
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
      <div className="w-full max-w-md p-8 bg-zinc-800 rounded-2xl shadow-lg border border-zinc-700">
        
        {/* Header */}
        <h1 className="text-3xl font-bold text-center mb-6 text-yellow-400 tracking-wide">
          Welcome Back
        </h1>
        <p className="text-center text-gray-400 mb-8">
          Login to continue exploring your books 📚
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-zinc-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={handleEmail}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-zinc-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-yellow-400 text-zinc-900 font-semibold rounded-lg shadow-md hover:bg-yellow-500 transition duration-300"
          >
            Login
          </button>
        </form>
        
        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Don’t have an account?{" "}
          <a
            href="/Signup"
            className="text-yellow-400 font-medium hover:underline"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  )
}

export default Login
