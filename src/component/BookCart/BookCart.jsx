import React from 'react'
import { Link } from 'react-router-dom'
import Favourites from '../Profile/Favourites'
import axios from 'axios'
import { useEffect } from 'react'


const BookCart = ({ data,Favourites,onRemove }) => {
const handleRemoveFavouraties = async () => {
     try {
                const response = await axios.put(
                  "https://bookstore-backend-y2rz.onrender.com/api/v1/deleteBookFavoraties",
                  { 
                    id: localStorage.getItem("id"), 
                    bookid: data._id
                  },
                  { 
                    headers: { authorization: `Bearer ${localStorage.getItem("token")}` } 
                  }
                );

                alert(response.data.message);

                // remove locally without extra API call
    onRemove(data._id);

  } catch (error) {
    console.error("Cannot remove from favorites", error);
  }
};

  
  return (
    <div className="block max-w-xs rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-zinc-800 p-3">
    <Link 
      to={`/viewbookDetails/${data._id}`} 
      
    >
      <div>
      {/* Book Image */}
      <div className="w-full h-40 overflow-hidden rounded-lg mb-2">
        <img 
          src={data.url} 
          alt={data.title} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
        />
      </div>

      {/* Book Details */}
      <h2 className="text-base font-bold text-gray-300 truncate">
        {data.title}
      </h2>
      <p className='text-yellow-300'>{data.author}</p>
      <p className="text-sm text-green-400 mt-1">
        ₹ {data.price}
      </p>
      </div>
    </Link>
    {Favourites && (
      <button className='bg-yellow-50 px-4 py-2 rounded border border-yellow-500 text-yellow-500 mt-4' onClick={handleRemoveFavouraties}>Remove from Favourite</button>
    )}
    </div>
  )
}

export default BookCart
