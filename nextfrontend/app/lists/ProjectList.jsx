import React from 'react';
import ProjectCard from '../components/Projects/ProjectCard';

import projects from '@/Data/data';

/**
  This list goes through the data, and creates a ProjectCard 
  with the data
*/
const TeamList = () => {
  return (
    <div style={listStyle}>
      {teams.map((team, index) => (
        <ProjectCard
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
