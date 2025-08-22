import React, { useState } from "react";
import axios from "axios";

const AddBook = () => {
  const [bookData, setBookData] = useState({
    url: "",
    title: "",
    author: "",
    language: "",
    desc: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/addbook", // backend endpoint
        bookData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Book added successfully!");
      setBookData({ url: "", title: "", author: "", language: "", desc: "" });
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Failed to add book");
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center bg-zinc-600 p-6">
      <div className="bg-zinc-900 shadow-md rounded-lg p-6 w-full max-w">
        <h1 className="text-2xl text-white font-semibold mb-6 ">
          Add New Book
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
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
          
          <div className="flex gap-4">
  {/* Price */}
  <div className="flex-1">
    <label className="block text-yellow-600 mb-1">Price</label>
    <input
      type="number"
      name="price"
      value={bookData.price} // <-- you had bookData.title before, changed to price
      onChange={handleChange}
      placeholder="Book Price"
      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      required
    />
  </div>

  {/* Author */}
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
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
