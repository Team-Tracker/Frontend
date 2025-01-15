'use client';
import { useRouter, useParams } from 'next/navigation';
import ChatCard from '@/app/components/Chat/ChatCard';

import teams from '@/Data/data';

// TODO: a service that manages a project
const ProjectDetailPage = () => {
  const router = useRouter();
  const { teamid } = useParams();

  // TODO: Add memberlist, add a Component, which displays your tasks, add a Component which does chat
  /** 
   * TODO: MenuBar which shows teamname, link to scrumboard and displays a dropdown "Window"
   * "Window": Enable or disable components, chat and tasks or members.
   *  
  */
  

  // Find the team details by ID
  // TODO: replace with route later...
  // team muss eine chatID zurück geben
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
