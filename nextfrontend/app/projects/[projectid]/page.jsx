'use client';
import { useRouter } from 'next/navigation';

const ProjectDetailPage = ({ params }) => {
  const router = useRouter();
  const { projectid } = params; // Access projectid from URL params

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
