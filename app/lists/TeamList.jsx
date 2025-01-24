"use client";
import React, { useState, useEffect } from 'react';

import TeamCard from '../components/Teams/TeamCard';
import { getTeams } from '../services/teamsManagement';

/**
  This list goes through the data, and creates a TeamCard 
  with the data
*/
const TeamList = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedTeams = await getTeams();
      setTeams(fetchedTeams);
    };

    fetchData();
    console.log(teams)
  }, []);

  return (
    <div style={listStyle}>
      {teams.map((team, index) => (
        <TeamCard
          key={index}
          teamid = {team.teamid}
          teamName={team.teamName}
          leaderName={team.leaderName}
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
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  justifyContent: 'flex-start',
};

export default TeamList;
