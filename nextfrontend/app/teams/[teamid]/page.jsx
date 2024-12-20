'use client';
import { useRouter, useParams } from 'next/navigation';

import teams from '@/Data/data';

// TODO: a service that manages a project
const ProjectDetailPage = () => {
  const router = useRouter();
  const { projectid } = useParams();

  console.log(projectid)

  const handleShowScrumboard = () => {
    router.push(`/teams/${projectid}/scrumboard`);
  };
  
  const getId = () => {
    teams.map((team, index) => {

    })
  }

  return (
    <div>
      <h1>Project Details for Project: {getId}</h1>
      <button onClick={handleShowScrumboard}>Show Scrum</button>
    </div>
  );
};


export default ProjectDetailPage;
