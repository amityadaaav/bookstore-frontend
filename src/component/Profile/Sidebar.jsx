import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux"
import { authActions } from "../../Store/auth"

const Sidebar = ({ data }) => {
  const dispatch = useDispatch();
  const history = useNavigate()
  const role = useSelector((state) => state.auth.role)

  return (
    <div className="bg-zinc-900 p-6 rounded-2xl flex flex-col items-center shadow-lg h-full w-full">
      {/* User Info */}
      <div className="flex items-center flex-col justify-center text-center">
        <img 
          src={data.avatar} 
          alt="avatar" 
          className="h-[12vh] w-[12vh] rounded-full border-4 border-yellow-400 shadow-md object-cover"
        />
        <p className="mt-3 text-xl text-white font-bold tracking-wide">
          {data.username}
        </p>
        <p className="mt-1 text-sm text-zinc-400">{data.email}</p>
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-zinc-700 my-4"></div>

      {/* Sidebar Links */}
      {role === "user" && (
        <div className="w-full flex flex-col items-center gap-2">
          <Link
            to="."
            className="w-full py-2 px-3 text-center text-zinc-100 font-medium rounded-lg hover:bg-yellow-500 hover:text-zinc-900 transition"
          >
            Favorites
          </Link>

          <Link
            to="orderHistory"
            className="w-full py-2 px-3 text-center text-zinc-100 font-medium rounded-lg hover:bg-yellow-500 hover:text-zinc-900 transition"
          >
            Order History
          </Link>

          <Link
            to="setting"
            className="w-full py-2 px-3 text-center text-zinc-100 font-medium rounded-lg hover:bg-yellow-500 hover:text-zinc-900 transition"
          >
            Settings
          </Link>
        </div>
      )}

      {role === "admin" && (
        <div className="w-full flex flex-col items-center gap-2">
          <Link
            to="."
            className="w-full py-2 px-3 text-center text-zinc-100 font-medium rounded-lg hover:bg-yellow-500 hover:text-zinc-900 transition"
          >
            All Orders
          </Link>

          <Link
            to="addbook"
            className="w-full py-2 px-3 text-center text-zinc-100 font-medium rounded-lg hover:bg-yellow-500 hover:text-zinc-900 transition"
          >
            Add Book
          </Link>
        </div>
      )}

      {/* Logout Button */}
      <button
        className="mt-6 w-full py-2 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg flex items-center justify-center gap-2 hover:from-red-600 hover:to-red-700 transition"
        onClick={() => {
          dispatch(authActions.logout());
          dispatch(authActions.changeRole("user"));
          localStorage.clear("id")
          localStorage.clear("token")
          localStorage.clear("role")
          history("/")
        }}
      >
        Logout <FaArrowRightFromBracket className="text-lg" />
      </button>
    </div>
  )
}

export default Sidebar
