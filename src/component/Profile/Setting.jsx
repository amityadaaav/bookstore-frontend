import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Setting = () => {
  const [userData, setUserData] = useState({ address:"" });
        useEffect(() => {
            const fetchUser = async () => {
              try {
                const token = localStorage.getItem("token");
                if (!token) throw new Error("Token not found");

                const response = await axios.get(
                  "https://bookstore-backend-y2rz.onrender.com/api/v1/getuserdetail",
                  {
                    headers: { Authorization: `Bearer ${token}` }
                  }
                );
                console.log("User data:", response.data.user);
                setUserData(response.data.user || {});
              } catch (error) {
                console.error("Can't fetch data:", error.response?.data || error.message);
              }
            };

            fetchUser();
          }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate =async () => {
    try {
    const response = await axios.put(
      "https://bookstore-backend-y2rz.onrender.com/api/v1/updateUserDetails",
      { address: userData.address, mobile: userData.mobile },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data.success) {
      alert("User details updated successfully!");
      setUserData(response.data.user); // update state with latest data
    }
  }catch{
    console.log("not updated")
  }
  };

  return (

    
    <div className="min-h-screen bg-zinc-700 p-6 overflow-hidden  ">
      <h1 className="text-2xl font-semibold mb-6 text-white">User Settings</h1>

      <div className="bg-zinc-900 shadow rounded-lg p-6 max-w-md mx-auto">
        <div className="space-y-4">

          {/* Name (Static) */}
          <div>
            <label className="block text-gray-600 mb-1">Name  </label>
            <span className="text-gray-800 font-medium">{userData.username}</span>
          </div>

          {/* Email (Static) */}
          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <span className="text-gray-800 font-medium">{userData.email}</span>
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Mobile No</label>
            <span className="text-gray-800 font-medium">{userData.mobileNo}</span>
          </div>
          {/* Address (Editable) */}
          <div>
            <label className="block text-gray-600 mb-1">Address</label>
            <textarea
              name="address"
              value={userData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            />
          </div>

          <button
            onClick={handleUpdate}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold"
          >
            Update
          </button>

        </div>
      </div>
    </div>
  );
};

export default Setting;
