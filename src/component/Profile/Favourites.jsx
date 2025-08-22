import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BookCart from '../BookCart/BookCart';

const Favourites = () => {
  const [favdata, setFavdata] = useState([]);
  const id = localStorage.getItem("id");

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(
          "https://bookstore-backend-y2rz.onrender.com/api/v1/getBookFavoraties",
          {
            params: { id }, // send id as query param
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        );
        console.log(response.data.data);
        setFavdata(response.data.data);
      } catch (error) {
        console.error("Can't fetch data", error);
      }
    };

    fetchFavorites();
  }, []);
    // }, [favdata]); it will cause isssue
    // favourite remove use this methode
// callback for removing favourite locally
  const handleRemove = (bookId) => {
    setFavdata(prev => prev.filter(book => book._id !== bookId))
  }

  return (
    <div className="w-full h-full">
  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {favdata.length > 0
        ? favdata.map((ele, i) => <BookCart key={i} data={ele} Favourites={true} onRemove={handleRemove}/>)
        : <p>No favorites found</p>}
    </div> </div>
  );
};

export default Favourites;
