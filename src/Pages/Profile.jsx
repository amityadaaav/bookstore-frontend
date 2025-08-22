import React, { useEffect, useState } from "react";
import Sidebar from "../component/Profile/Sidebar";
import axios from "axios";
import Loader from "../component/Loader/Loader";
import { Outlet } from "react-router-dom";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `https://bookstore-backend-y2rz.onrender.com/api/v1/getuserdetail`,
          { headers }
        );
        setProfile(response.data.user);
      } catch (error) {
        console.log("cant fetch data");
      }
    };
    fetch();
  }, []);

  return (
    <div className="bg-zinc-900 px-4 md:px-12 flex flex-col md:flex-row h-screen py-6 gap-6 text-white">
      {!profile ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          {/* Sidebar */}
          <div className="w-full md:w-1/4 h-full">
            <div className="bg-zinc-800 rounded-2xl p-6 shadow-lg border border-zinc-700 h-full">
              <Sidebar data={profile} />
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4 h-full overflow-auto scrollbar-hide">
            <div className="bg-zinc-800 rounded-2xl p-6 shadow-lg border border-zinc-700 h-full">
              <Outlet />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
