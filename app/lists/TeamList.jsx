"use client";

import React, { useState, useEffect } from "react";

import TeamCard from "../components/Teams/TeamCard";
import { getTeams } from "../services/teamsManagement";

/**
  This list goes through the data, and creates a TeamCard 
  with the data
*/
const TeamList = () => {
  const [teams, setTeams] = useState([]);
  const [userId, setUserId] = useState(null);

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

export default TeamList;
