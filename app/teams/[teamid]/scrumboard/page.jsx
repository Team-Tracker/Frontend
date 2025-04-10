"use client";

// import { tasks } from "@/Data/data";
import React, { useState, useMemo, useEffect } from "react";

import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation.js";

import { Flex, Heading, Text, Button } from "@chakra-ui/react";
import { DragDropContext } from "react-beautiful-dnd";
import { createListCollection } from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import { fetchSprintList, fetchTasks, updateScrumBoard } from "@/app/services/scrumService";

//TODO:

const Column = dynamic(() => import("../../../components/Projects/Column"), {
  ssr: false,
});

const reorderColumnList = (sourceCol, startIndex, endIndex) => {
  const newTaskIds = Array.from(sourceCol.taskIds);
  const [removed] = newTaskIds.splice(startIndex, 1);
  newTaskIds.splice(endIndex, 0, removed);

  const newColumn = {
    ...sourceCol,
    taskIds: newTaskIds,
  };

  return newColumn;
};

export default function Home({ params }) {
  const router = useRouter();
  const teamid = params.teamid;
  const [state, setState] = useState({
    tasks: {},
    columns: {},
    columnOrder: [],
  });
  const [oldState, setOldState] = useState([]);
  const [droppedState, setDroppedState] = useState([]);
  const [sprintsList, setSprints] = useState([]);

  useEffect(() => {
    const fetchSprints = async () => {
      try {
        const fetchedTasks = await fetchTasks(teamid)
        const fetchSprints = await fetchSprintList(teamid);
        console.log("Fetched sprints: ", fetchSprints);
        setSprints(fetchSprints);
        setState(fetchedTasks);
      } catch (error) {
        console.error("Error fetching sprints: ", error);
      }
    };

    fetchSprints();
  }, [teamid]);

  const sprints = useMemo(() => {

    return createListCollection({
      items: sprintsList.value || [],
      itemToString: (item) => item.id,
      itemToValue: (item) => item.sprintNumber,
    });
  }, [sprintsList.value]);

  const onDragEnd = (result) => {
    const { destination, source } = result;

    // If user tries to drop in an unknown destination
    if (!destination) return;

    // if the user drags and drops back in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // If the user drops within the same column but in a different positoin
    const sourceCol = state.columns[source.droppableId];
    const destinationCol = state.columns[destination.droppableId];

    if (sourceCol.id === destinationCol.id) {
      const newColumn = reorderColumnList(
        sourceCol,
        source.index,
        destination.index
      );

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };
      setState(newState);
      return;
    }

    // If the user moves from one column to another
    const startTaskIds = Array.from(sourceCol.taskIds);
    const [removed] = startTaskIds.splice(source.index, 1);
    const newStartCol = {
      ...sourceCol,
      taskIds: startTaskIds,
    };

    const endTaskIds = Array.from(destinationCol.taskIds);
    endTaskIds.splice(destination.index, 0, removed);
    const newEndCol = {
      ...destinationCol,
      taskIds: endTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      },
    };
    setState(newState);
    console.log(state);
    console.log(state.columns);
  };

  const handleSaveChanges = async () => {
    // TODO: A request that sends the updated data to the Backend

    const response = await updateScrumBoard(state.tasks)
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Flex
        flexDir="column"
        bg="main-bg"
        minH="100vh"
        w="full"
        color="white-text"
        pb="1rem"
      >
        <Flex
          py="4rem"
          flexDir="column"
          align="center"
          position="relative"
          w="full"
        >
          <Button
            position="absolute"
            top="1rem"
            left="1rem"
            onClick={() => router.push(`/teams/${teamid}`)}
            colorScheme="blue"
            variant="outline"
            size="sm"
          >
            Back to Project Details
          </Button>

          <SelectRoot
            collection={sprints}
            position="absolute"
            top="1rem"
            left="20rem"
            size="sm"
            variant="outline"
            width="120px"
          >
            <SelectTrigger>
              <SelectValueText placeholder="Select Sprint" />
            </SelectTrigger>
            <SelectContent>
              {sprints.length > 0 ? (
                sprints.map((sprint) => (
                  <SelectItem key={sprint.id} value={sprint.id}>
                    {sprint.name}
                  </SelectItem>
                ))
              ) : (
                <Text>No Sprints Available</Text>
              )}
            </SelectContent>
          </SelectRoot>

          <Button
            position="absolute"
            top="1rem"
            left="28rem"
            onClick={() => router.push(`/teams/${teamid}/scrumboard/addSprint`)}
            colorScheme="blue"
            variant="outline"
            size="sm"
          >
            Add Sprint
          </Button>

          <Button
            position="absolute"
            top="1rem"
            left="35rem"
            onClick={() => router.push(`/teams/${teamid}/scrumboard/addTask?boardId=${boardId}`)}
            colorScheme="blue"
            variant="outline"
            size="sm"
          >
            Add Task
          </Button>

          <Button
            position="absolute"
            top="1rem"
            left="90rem"
            onClick={() => handleSaveChanges()}
            colorScheme="green"
            variant="outline"
            size="sm"
          >
            Save Changes
          </Button>

          <Heading padding="4px" fontSize="3xl" fontWeight={600}>
            React Beautiful Drag and Drop
          </Heading>
          <Text fontSize="20px" fontWeight={600} color="subtle-text">
            react-beautiful-dnd
          </Text>
        </Flex>

        <Flex justify="space-between" px="4rem" top="4px">
          {state.columnOrder.map((columnId) => {
            const column = state.columns[columnId];
            const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

            return (
              <Column
                key={column.id}
                value={column.state}
                column={column}
                tasks={tasks}
              />
            );
          })}
        </Flex>
      </Flex>
    </DragDropContext>
  );
}
