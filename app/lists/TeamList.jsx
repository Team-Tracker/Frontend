"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import TeamCard from "../components/Teams/TeamCard";
import { getTeams } from "../services/teamsManagement";

/**
  This list goes through the data, and creates a TeamCard 
  with the data
*/
const TeamList = () => {
  const [teams, setTeams] = useState([]);
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Get userId from cookie only on client-side
    const getCookie = (name) => {
      if (typeof document === "undefined") return null; // Ensure it's client-side
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + "=")) {
          return cookie.substring(name.length + 1);
        }
      }
      return null;
    };


    const fetchData = async () => {
      const cookie = getCookie("userId")

      const fetchedTeams = await getTeams(cookie);
      const fetchedTeamsData = await fetchedTeams.json();
      setTeams(fetchedTeamsData);
    };

    fetchData();
  }, []);

  return (
    <div style={listStyle}>
      {teams.map((team, index) => (
        <TeamCard
          key={index}
          teamid={team.id}
          teamName={team.name}
          leaderName={team.createrId}
          description={team.description}
        />
      ))}

      <button
        onClick={() => router.push("/teams/add")}
        style={buttonStyle}
      >
        +
      </button>
    </div>
  );
};

/**
  some basic CSS-formatation for the List:
  - display flex for listing them in a row
  - flexWrap for going to the next row
  - justifyContent flex-start for putting it on 
    the left side
*/
const listStyle = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  // marginLeft: "250px", // Adjust based on your sidebar width
  padding: "20px",
  gap: "16px",
};

const buttonStyle = {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  fontSize: "24px",
  cursor: "pointer",
  boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default TeamList;
