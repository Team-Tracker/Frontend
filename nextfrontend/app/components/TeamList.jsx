import React from 'react';
import TeamCard from '../components/TeamCard';

import teams from '@/Data/data';

const TeamList = () => {
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

const listStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  justifyContent: 'flex-start',
};

export default TeamList;
