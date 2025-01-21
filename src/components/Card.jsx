import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ title, type, status }) => {
  const navigate = useNavigate();
  const handleOpen = () => {
    navigate(`/manga_detail/${title}`, {
      state: {
        title,
        type,
        status,
      },
    });
  };

  return (
    <div
      onClick={handleOpen}
      className="bg-gray-900 border border-gray-500 rounded-2xl item flex items-center gap-5 max-w-[500px] hover:bg-gray-800 cursor-pointer"
    >
      <div className="flex gap-5 items-center">
        <div className="flex flex-col">
          <h3 className="text-white">{title}</h3>
          <h1 className="text-white">Status: {status}</h1>
          <h1 className="text-white">type: {type}</h1>
        </div>
      </div>
    </div>
  );
};

export default Card;
