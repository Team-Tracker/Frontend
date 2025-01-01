'use client';
import { useRouter, useParams } from 'next/navigation';

import teams from '@/Data/data';

// TODO: a service that manages a project
const ProjectDetailPage = () => {
  const router = useRouter();
  const { teamid } = useParams();

  // Find the team details by ID
  const team = teams.find((team) => team.teamid === parseInt(teamid));

  // Render a loading state or 404 if team not found
  if (!team) {
    return <div>Loading...</div>;
  }

  console.log(teamid);

  const handleShowScrumboard = () => {
    router.push(`/teams/${teamid}/scrumboard`);
  };

  const getName = () => {
    const foundTeam = teams.find((team) => team.teamid === parseInt(teamid));
    if (foundTeam) {
      console.log('Found: ' + foundTeam.teamName);
      return foundTeam.teamName;
    }
    return 'Unknown Project';
  };

  return (
    <div>
      <h1>Project Details for Project: {getName()}</h1>
      <button onClick={handleShowScrumboard}>Show Scrum</button>
    </div>
  );
};

export default ProjectDetailPage;
