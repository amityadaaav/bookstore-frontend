import React from "react";

const UserDetailsModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-zinc-600 bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-gray-900 p-6 rounded-xl w-[90%] md:w-[400px] shadow-lg">
        <h2 className="text-lg font-bold mb-4">User Details</h2>

        <p><span className="font-semibold">Name:</span> {user.name}</p>
        <p><span className="font-semibold">Email:</span> {user.email}</p>
        <p><span className="font-semibold">Phone:</span> {user.phone}</p>
        <p><span className="font-semibold">Address:</span> {user.address}</p>

        <button
          className="mt-4 px-4 py-2 bg-red-500 rounded hover:bg-red-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UserDetailsModal;
