'use client';
import { useRouter, useParams } from 'next/navigation';

// TODO: a service that manages a project
const ProjectDetailPage = () => {
  const router = useRouter();
  const { projectid } = useParams();

  console.log(projectid)

  const handleShowScrumboard = () => {
    router.push(`/projects/${projectid}/scrumboard`);
  };

  return (
    <div>
      <h1>Project Details for Project ID: {projectid}</h1>
      <button onClick={handleShowScrumboard}>Show Scrum</button>
    </div>
  );
};

export default ProjectDetailPage;
