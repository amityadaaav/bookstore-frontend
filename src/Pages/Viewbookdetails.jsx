import axios from 'axios'
import React from 'react'
import { useState,useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useParams,useNavigate, Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { IoHeartCircleSharp } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";



const Viewbookdetails = () => {
      const { id } = useParams()   //it will fetch id from URL 
    const [Data,setData]=useState([])
    const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn);
    const role=useSelector((state)=>state.auth.role)
    console.log(isLoggedIn,role)
    const navigate=useNavigate()
    useEffect(() => {
            const fetch = async () => {
              try {
                const response = await axios.get(`https://bookstore-backend-y2rz.onrender.com/api/v1/getidBook/${id}`)
                console.log(response)
                setData(response.data.data)
              } catch (error) {
                console.log("cant fetch data")
              }
            }
            fetch()
          }, [id])
  //             const headers={
  //             id:localStorage.getItem("id"),
  //             authorization:`Bearer ${localStorage.getItem("token")}`
  // }
  // console.log(id)
          const handleFavourite = async () => {  
              try {
                const response = await axios.put(
                  "https://bookstore-backend-y2rz.onrender.com/api/v1/addBookFavoraties",
                  { 
                    id: localStorage.getItem("id"), 
                    bookid: id // <-- the book id you want to add
                  },
                  { 
                    headers: { authorization: `Bearer ${localStorage.getItem("token")}` } 
                  }
                );

                alert(response.data.message);

              } catch (error) {
                console.log("Could not add in fav");
              }
            }

            const handleCart = async () => {  
                try {
                  const response = await axios.put(
                    "https://bookstore-backend-y2rz.onrender.com/api/v1/addBookcart",
                    { 
                      id: localStorage.getItem("id"), 
                      bookid: id
                    },
                    { 
                      headers: { authorization: `Bearer ${localStorage.getItem("token")}` } 
                    }
                  );
                  alert(response.data.message);
                } catch (error) {
                  console.log("Could not add in Cart");
                }
              }

          const handleDelete=async(bookId)=>{ 
                try {
                    const response = await axios.delete(
                      `https://bookstore-backend-y2rz.onrender.com/api/v1/deleteBook/${bookId}`, // pass book id in URL
                      {
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                      }
                    );
                    alert(response.data.message);
                    navigate("/all-books")
                  } catch (error) {
                        console.log(" could not delete") 
                      }
          }
        
  return (
    <>{Data && 
      <div className="min-h-screen bg-zinc-900 text-white px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {/* Left: Book Image */}
        <div className="flex justify-center items-start">
          <img
            src={Data.url}
            alt={Data.title}
            className="w-[400px] h-[500px] object-cover rounded-xl shadow-lg"
          />
        </div>

        {/* Right: Data Details */}
        <div className="flex flex-col space-y-6">
          <h1 className="text-4xl font-bold">{Data.title}</h1>
          <p className="text-lg text-gray-300">{Data.author}</p>

          <div className="text-3xl font-semibold text-yellow-400">
            ₹ {Data.price}
          </div>

          <p className="text-gray-400 leading-relaxed">
            {Data.description ||
              "This Data is a perfect choice for readers who love engaging stories and deep insights."}
          </p>
    {isLoggedIn ===true && role==="user" &&(
          <div className="flex space-x-4 mt-6">
            <button className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition" onClick={handleCart}>
              <FaCartShopping />

            </button>
            <button className="bg-orange-500 px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
              Buy Now
            </button>
             <button className="bg-orange-500 px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition" onClick={handleFavourite}>
              <IoHeartCircleSharp />
            </button>
          </div>
    )}
    {isLoggedIn ===true && role==="admin" &&(
         <div className="flex space-x-8 mt-6">
            <button className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-red-800 transition" onClick={() => handleDelete(Data._id)} >
               <MdDeleteForever />

            </button>
            <Link  to={`/updateBook/${id}`} className="bg-orange-500 px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"  >
              <FaEdit />
            </Link>
          </div>
    )}
          

          {/* Extra Info */}
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-2">Product Details</h2>
            <ul className="space-y-2 text-gray-400">
              <li>Language: English</li>
              <li>Publisher: Penguin Random House</li>
              <li>Pages: 320</li>
              <li>Edition: 2024</li>
            </ul>
          </div>
        </div>
      </div>
    </div>}
    {!Data && <div className='h-screen bg-zinc-800 flex item-center justify-center'><Loader/></div>}
    </>
  )
}

export default Viewbookdetails
