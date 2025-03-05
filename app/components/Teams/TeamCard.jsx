"use client";

import React from "react";
import { useRouter } from "next/navigation";

const TeamCard = ({ teamid, teamName, description }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/teams/${teamid}`);
  };

  return (
    <div
      key={teamid}
      onClick={handleClick}
      className="bg-gray-800 text-white rounded-2xl shadow-lg p-6 cursor-pointer hover:scale-105 hover:shadow-2xl transition-transform duration-300 w-64 h-64 flex flex-col justify-between"
    >
      <h3 className="text-xl font-bold text-gray-100">{teamName}</h3>
      <p className="text-gray-500 text-sm">
        <strong className="text-gray-400">Description:</strong>{" "}
        {description.length > 20 ? `${description.slice(0, 20)}...` : description}
      </p>
    </div>
  );
};

export default TeamCard;
