import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-zinc-900">
      <div className="w-16 h-16 border-4 border-yellow-400 border-dashed rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
