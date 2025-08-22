import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { title: "Home", link: "/" },
    { title: "All Books", link: "/all-books" },
    { title: "Cart", link: "/cart" },
    { title: "Profile", link: "/profile" },
    { title: "Admin Profile", link: "/profile" },
  ];

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  // Filter links based on login and role
  const filteredLinks = links.filter((link) => {
    if (!isLoggedIn && ["Cart", "Profile", "Admin Profile"].includes(link.title)) {
      return false;
    }
    if (isLoggedIn && role === "user" && link.title === "Admin Profile") {
      return false;
    }
    if (isLoggedIn && role === "admin" && link.title === "Profile") {
      return false;
    }
    return true;
  });

  return (
    <nav className="bg-zinc-900 text-white px-6 py-4 flex items-center justify-between shadow-md sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <img
          src="https://imgs.search.brave.com/Ur7ILV8FFP8vuPU-h-2Oro9rT87GwO33MxYB8qrofsk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZnJlZXBuZ2xvZ29z/LmNvbS91cGxvYWRz/L2Jvb2stcG5nL29w/ZW5lZC1ib29rLWlt/YWdlLXRyYW5zcGFy/ZW50LXBuZy0xOC5w/bmc"
          alt="logo"
          className="h-10 drop-shadow-md"
        />
        <h1 className="text-2xl font-bold tracking-wide">Book Ocean</h1>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8">
        {filteredLinks.map((ele, i) => (
          <Link
            to={ele.link}
            key={i}
            className="relative text-lg font-medium hover:text-yellow-300 transition"
          >
            {ele.title}
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-300 transition-all duration-300 hover:w-full"></span>
          </Link>
        ))}

        {/* Login & Signup Buttons */}
        {!isLoggedIn && (
          <div className="flex gap-3 ml-4">
            <Link
              to="/login"
              className="px-4 py-1 border border-yellow-400 rounded-lg hover:bg-yellow-400 hover:text-zinc-900 transition-all shadow-sm"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-1 border border-yellow-400 rounded-lg hover:bg-yellow-400 hover:text-zinc-900 transition-all shadow-sm"
            >
              Signup
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Hamburger */}
      <div
        className="md:hidden text-2xl cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-zinc-900 flex flex-col items-center gap-6 py-6 md:hidden shadow-lg border-t border-zinc-700">
          {filteredLinks.map((ele, i) => (
            <Link
              to={ele.link}
              key={i}
              className="text-lg font-medium hover:text-yellow-300 transition"
              onClick={() => setIsOpen(false)}
            >
              {ele.title}
            </Link>
          ))}

          {!isLoggedIn && (
            <div className="flex flex-col gap-3 w-4/5">
              <Link
                to="/login"
                className="px-4 py-2 text-center border border-yellow-400 rounded-lg hover:bg-yellow-400 hover:text-zinc-900 transition-all shadow-sm"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 text-center border border-yellow-400 rounded-lg hover:bg-yellow-400 hover:text-zinc-900 transition-all shadow-sm"
                onClick={() => setIsOpen(false)}
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
