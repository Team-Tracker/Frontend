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
import { fetchSprintList } from "@/app/services/scrumService";

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
  const [state, setState] = useState(initialData);
  const [oldState, setOldState] = useState([]);
  const [droppedState, setDroppedState] = useState([]);
  const [sprintsList, setSprints] = useState([]);

  useEffect(() => {
    const fetchSprints = async () => {
      try {
        const fetchSprints = await fetchSprintList(teamid);
        print("Fetched sprints: ", fetchSprints);

        setSprints(fetchSprints);
      } catch (error) {
        console.error("Error fetching sprints: ", error);
      }
    };

    fetchSprints();
  }, []);

  const sprints = useMemo(() => {
    return sprintsList.map((sprint) => ({
      items: sprintsList || [],
      itemToString: (item) => item.sprintNumber,
      itemToValue: (item) => item.id,
    }));
  }, [sprintsList]);

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

  return (
    //TODO: A button to go back to the details (cache system)
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
            left="15rem"
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

// TODO: load the user stories and the columns seperate, and sort the taskids to the column, with the state

// const transformTasksData = (tasksArray) => {
//   const transformedtasks = {};

//   tasksArray.forEach(task => {
//     transformedtasks[task.id] = {...task};
//   });
// }

// transformTasksData(tasks);

const initialData = {
  tasks: {
    1: {
      id: 1,
      state: 1,
      creator: "Hockn",
      assigned: "McMahon",
      title: "ScrumDemo",
      content: "Configure Next.js application",
    },
    2: {
      id: 2,
      state: 2,
      creator: "Hockn",
      assigned: "Kurt",
      title: "ScrumDemo",
      content: "Configure Next.js and tailwind ",
    },
    3: {
      id: 3,
      state: 1,
      creator: "Toni",
      assigned: "Mr.Perfect",
      title: "ScrumDemo",
      content: "Create sidebar navigation menu",
    },
    4: {
      id: 4,
      state: 1,
      creator: "Toni",
      assigned: "Toni",
      title: "ScrumDemo",
      content: "Create page footer",
    },
    5: {
      id: 5,
      state: 1,
      creator: "Hockn",
      assigned: "Marcel Krei",
      title: "ScrumDemo",
      content: "Create page navigation menu",
    },
    6: {
      id: 6,
      state: 1,
      creator: "Hockn",
      assigned: "Alex",
      title: "ScrumDemo",
      content: "Create page layout",
    },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "TO-DO",
      state: "1",
      taskIds: [1, 2, 3, 4, 5, 6],
    },
    "column-2": {
      id: "column-2",
      title: "IN-PROGRESS",
      state: "2",
      taskIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "COMPLETED",
      state: "3",
      taskIds: [],
    },
    "column-4": {
      id: "column-4",
      title: "Verified",
      state: "4",
      taskIds: [],
    },
  },
  // Facilitate reordering of the columns
  columnOrder: ["column-1", "column-2", "column-3", "column-4"],
};
