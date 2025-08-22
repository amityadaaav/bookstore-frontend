import axios from 'axios'
import React, { useState, useEffect } from 'react'
import BookCart from '../component/BookCart/BookCart'

const Allbook = () => {
  const [Data, setData] = useState([])

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/getBook")
        setData(response.data.data)
      } catch (error) {
        console.log("cant fetch data")
      }
    }
    fetch()
  }, [])

  return (
    <div className="bg-zinc-900 min-h-screen text-white px-4 py-8">
      <div className="max-w-[1400px] mx-auto">
        {/* Page Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-8 text-center">
          All Books
        </h1>

        {/* Grid container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Data && Data.length > 0 ? (
            Data.map((ele, i) => <BookCart key={i} data={ele} />)
          ) : (
            <p className="col-span-full text-center text-gray-400 mt-10">
              No books available.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Allbook
