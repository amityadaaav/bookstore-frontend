import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BookCart from '../BookCart/BookCart'

const RecentAdded = () => {
  const [Data, setData] = useState([])

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("https://bookstore-backend-y2rz.onrender.com/api/v1/getBook4")
        setData(response.data.data)
      } catch (error) {
        console.log("❌ Can't fetch data")
      }
    }
    fetch()
  }, [])

  return (
    <div className="mt-16 px-6 md:px-16">
      <h4 className="text-2xl md:text-3xl font-semibold text-yellow-100 mb-8">
        Recently Added Books
      </h4>

      {/* Grid container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Data && Data.length > 0 ? (
          Data.map((ele, i) => (
            <BookCart key={i} data={ele} />
          ))
        ) : (
          <p className="text-zinc-400">No books found</p>
        )}
      </div>
    </div>
  )
}

export default RecentAdded
