'use client';
import { useRouter } from 'next/navigation';
import { Card, Text } from "@nextui-org/react";

const ProjectsPage = () => {
  const router = useRouter();

  // TODO: Create a service that gets all projects that the user is part of
  const projects = [
    { id: '1', name: 'Project 1' },
    { id: '2', name: 'Project 2' },
    { id: '3', name: 'Project 3' },
  ];

  const handleProjectClick = (projectId) => {
    router.push(`/projects/${projectId}`);
  };

  return (
    <div>
      <h1>Your Projects</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <button onClick={() => handleProjectClick(project.id)}>
              {project.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectsPage;
