'use client';
import { useRouter } from 'next/navigation';
import { Card, Text } from "@nextui-org/react";

const ProjectsPage = () => {
  const router = useRouter();

  // TODO: Create a service that gets all projects that the user is part of
  const projects = [
    { id: '1', name: 'Project 1', owner: "dummy1", members: ["dummy1", "dummy2", "dummy3", "dummy4"] },
    { id: '2', name: 'Project 2', owner: "toni", members: ["toni1", "toni2", "toni3", "toni4"]  },
    { id: '3', name: 'Project 3', owner: "hockn", members: ["JohnDoe", "JoJo", "testuser3", "testuser4"]  },
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
