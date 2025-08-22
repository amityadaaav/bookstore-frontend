
import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className="h-screen md:h-[75vh] flex flex-col md:flex-row items-center justify-between px-6 md:px-16">
      {/* Left Content */}
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start justify-center text-center lg:text-left">
        <h1 className="text-4xl lg:text-6xl font-bold text-yellow-100 leading-snug">
          Discover Your Next Great Read
        </h1>
        <p className="mt-4 text-lg md:text-xl text-zinc-300 max-w-xl">
          Uncover captivating stories, enriching knowledge, and endless
          inspiration in our curated collection of books.
        </p>
        <div className="mt-6">
          <Link to="/all-books">
            <button className="px-6 py-2 rounded-lg text-yellow-100 text-lg font-semibold border border-yellow-100 hover:bg-yellow-100 hover:text-zinc-900 transition">
              Discover Books
            </button>
          </Link>
        </div>
      </div>

      {/* Right Image */}
      <div className="w-full lg:w-1/2 flex items-center justify-center mt-10 md:mt-0">
        <img
          src="/pngnew.png"
          alt="Books"
          className="w-full mt-22 max-w-md lg:max-w-lg object-contain drop-shadow-lg"
        />
      </div>
    </div>
  )
}

export default Hero
