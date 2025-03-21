"use client";

import { useRouter, useParams } from "next/navigation";
import { Container, Flex, Box, Button, Grid } from "@chakra-ui/react";

import Tasks from "@/app/components/Projects/Tasks";
import ChatCard from "@/app/components/Chat/ChatCard";
import MemberList from "@/app/components/Projects/MemberList";

import { getProject, getTeamChat } from "@/app/services/teamsManagement";
import { useState, useEffect } from "react";
import { useMenu } from "./MenuContext";

const ProjectDetailPage = () => {
  const router = useRouter();

  const {teamid}  = useParams();

  const [team, setTeam] = useState(null);
  const [teamChatId, setTeamChatId] = useState(null);
  const [userId, setUserId] = useState(null);

  const { selectedAction } = useMenu();

  useEffect(() => {
    const getCookie = (name) => {
      if (typeof document === "undefined") return null;
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + "=")) {
          return cookie.substring(name.length + 1);
        }
      }
      return null;
    };

    const fetchData = async () => {
      const cookie = getCookie("userId");
      setUserId(cookie);
      try{
        const team = await getProject(teamid);
        const teamData = await team.json(); 

        // ! ERROR: if enable -> ChatCard, UI Error:
        // ! Objects are not valid as a react child 
        // ! (found: object with keys {id, name, timestamp}). If you meant to render a collection of children, use an array instead.
        const teamChat = await getTeamChat(teamid);
        const teamChatData = await teamChat.json();
        console.log("TeamChat DAta: ", teamChatData)
        setTeam(teamData);
        setTeamChatId(teamChatData.id);
      } catch (err) {
        console.error("Error fetching data...")
      }
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
    <Flex direction="column" height="100vh">
      <Flex as="nav" bg="gray.800" color="white" p={4} justify="space-between">
        <Box>Go Back</Box>
        <Box>View</Box>
      </Flex>

      {/* Main Content */}
      <Flex flex="1" p={4}>
        <Grid templateColumns="2fr 1fr" gap={6} width="85%" mx="auto">
          {/* Left Column: Tasks & Chat - Takes 2/3 width */}
          <Flex direction="column" gap={6} flex="2">
            {selectedAction.enableTasks && (
              <Container
                height="25vh"
                bg="gray.900"
                p={4}
                borderRadius="lg"
                border="2px solid green"
              >
                <Tasks />
              </Container>
            )}
            {selectedAction.enableChat && (
              <Container
                height="50vh"
                bg="gray.900"
                p={4}
                borderRadius="lg"
                border="2px solid purple"
              >
                <ChatCard chatId={teamChatId} userId={userId} />
              </Container>
            )}
          </Flex>

          {/* Right Column: Member List + Scrum Button - Takes 1/3 width */}
          <Flex direction="column" flex="1" gap={4}>
            {selectedAction.enableMemberList && (
              <Container
                height="65vh"
                bg="gray.900"
                p={4}
                borderRadius="lg"
                border="2px solid yellow"
              >
                <MemberList teamId={teamid}/>
              </Container>
            )}
            {/* Show Scrum Button - Ensuring it is visible */}
            <Box
              height="10vh"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Button
                colorScheme="blue"
                size="lg"
                onClick={handleShowScrumboard}
                width="full"
              >
                Show Scrum
              </Button>
            </Box>
          </Flex>
        </Grid>
      </Flex>
    </Flex>
  );
};

export default ProjectDetailPage;
