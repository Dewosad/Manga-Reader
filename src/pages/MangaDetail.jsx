import React from "react";
import { useLocation } from "react-router-dom";

const MangaDetails = () => {
  const location = useLocation();
  const { title, type, status } = location.state || {};

  return (
    <div className="bg-gray-900 flex h-full text-white p-5">
      <div className="flex flex-col items-center justify-center h-full w-full">
        <h3 className="text-white">{title}</h3>
        <h1 className="text-white">Status: {status}</h1>
        <h1 className="text-white">type: {type}</h1>
      </div>
    </div>
  );
};

export default MangaDetails;
