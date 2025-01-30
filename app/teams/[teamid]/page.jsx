'use client';

import { useRouter, useParams } from 'next/navigation';

import { Container } from "@chakra-ui/react"
import { Flex } from "@chakra-ui/react"

import Tasks from '@/app/components/Projects/Tasks';
import ChatCard from '@/app/components/Chat/ChatCard';
import MemberList from '@/app/components/Projects/MemberList';

import { getProject } from '@/app/services/teamsManagement';
import { useState, useEffect } from 'react';

import { useMenu } from './MenuContext';

const ProjectDetailPage = () => {
  const router = useRouter();
  const { teamid } = useParams();
  const [team, setTeam] = useState(null);
  const { selectedAction } = useMenu();

  useEffect(() => {
    const fetchData = async () => {
      const team = await getProject();
      setTeam(team);
    };
    fetchData();
  }, []);

  if (!team) {
    return <div>Loading...</div>;
  }

  const handleShowScrumboard = () => {
    router.push(`/teams/${teamid}/scrumboard`);
  };

  return (
    <Flex>
          {selectedAction.enableTasks && <Container height="3/8" width="1/3"><Tasks /></Container>}
          <div className="h-1/8" />
          {selectedAction.enableChat && <Container width="1/3"><ChatCard /></Container>}
        {selectedAction.enableMemberList && <Container className="w-1/3 h-3/4"><MemberList /></Container>}
      
      <div className="w-full flex justify-center mt-4">
        <button className="fixed bottom-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={handleShowScrumboard}>Show Scrum</button>
      </div>
    </Flex>
  );
};

export default ProjectDetailPage;
