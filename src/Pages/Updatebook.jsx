import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Updatebook = () => {
  const { id } = useParams(); // get book id from URL
  const navigate=useNavigate()
  const [bookData, setBookData] = useState({
    url: "",
    title: "",
    author: "",
    language: "",
    desc: "",
    price: "",
  });

  // Fetch existing book data
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/getidBook/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setBookData(response.data.data); // populate form with existing data
      } catch (error) {
        console.error("Cannot fetch book data:", error);
      }
    };
    fetchBook();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission (update book)
  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.put(
      `http://localhost:5000/api/v1/updateBook/${id}`,
      bookData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    alert("Book updated successfully!");
    navigate("/all-books")
  } catch (error) {
    console.error("Error updating book:", error);
    alert("Failed to update book");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-600 p-6">
      <div className="bg-zinc-900 shadow-md rounded-lg p-6 w-full max-w-2xl">
        <h1 className="text-2xl text-white font-semibold mb-6">
          Update Book
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Image URL */}
          <div>
            <label className="block text-yellow-600 mb-1">Image URL</label>
            <input
              type="text"
              name="url"
              value={bookData.url}
              onChange={handleChange}
              placeholder="https://example.com/book.jpg"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-yellow-600 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={bookData.title}
              onChange={handleChange}
              placeholder="Book Title"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Price & Author side by side */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-yellow-600 mb-1">Price</label>
              <input
                type="number"
                name="price"
                value={bookData.price}
                onChange={handleChange}
                placeholder="Book Price"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="flex-1">
              <label className="block text-yellow-600 mb-1">Author</label>
              <input
                type="text"
                name="author"
                value={bookData.author}
                onChange={handleChange}
                placeholder="Author Name"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>

          {/* Language */}
          <div>
            <label className="block text-yellow-600 mb-1">Language</label>
            <input
              type="text"
              name="language"
              value={bookData.language}
              onChange={handleChange}
              placeholder="e.g., English, Hindi"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-yellow-600 mb-1">Description</label>
            <textarea
              name="desc"
              value={bookData.desc}
              onChange={handleChange}
              placeholder="Enter book description"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              rows={4}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-semibold"
          >
            Update Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default Updatebook;
