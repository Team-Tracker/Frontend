'use client';
import { useRouter, useParams } from 'next/navigation';
import teams from '@/Data/data';

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

  console.log(teamid)

  const handleShowScrumboard = () => {
    router.push(`/teams/${teamid}/scrumboard`);
  };

  const getId = () => {
    teams.map((team, index) => {

    })
  }

  return (
    <div>
<<<<<<< HEAD
      <h1>Project Details for {team.teamName}</h1>
      <p className="mt-4">
        <strong>Leader:</strong> {team.leaderName}
      </p>
      <p className="mt-2">
        <strong>Description:</strong> {team.description}
      </p>
=======
      <h1>Project Details for Project: {getId}</h1>
>>>>>>> refs/remotes/origin/chatfunction
      <button onClick={handleShowScrumboard}>Show Scrum</button>
    </div>
  );
};


export default ProjectDetailPage;
