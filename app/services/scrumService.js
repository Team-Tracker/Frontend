const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const defaultStructure = {
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
  columnOrder: ["column-1", "column-2", "column-3", "column-4"],
};

export async function fetchTasks(teamId) {
  const response = await fetch(`${baseUrl}/scrum/sprints`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Failed to get sprints");
  }

  const sprints = await response.json();
  const filteredSprints = sprints.filter((sprint) => sprint.teamid === teamId);

  if (!filteredSprints || filteredSprints.length === 0) {
    return defaultStructure;
  }

  // Add columns and columnOrder to the response
  return {
    sprints: filteredSprints,
    columns: defaultStructure.columns,
    columnOrder: defaultStructure.columnOrder,
  };
}

export async function fetchSprintList(teamId) {
  const response = await fetch(`${baseUrl}/scrum/sprints`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Failed to get sprints");
  }
  const sprints = await response.json();
  return sprints.filter((sprint) => sprint.teamId == teamId);
}

export async function addTask(name, desc, boardId, userId) {
  const response = await fetch(`${baseUrl}/scrum/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "name": name,
      "description": desc,
      "boardId": boardId,
      "creatorId": userId,
      "state": "TODO"
    }),
  });


  if (response.ok) {
    return response;
  } 
}

export async function addSprint(teamid, startDate, endDate) {
  const response = await fetch(`${baseUrl}/scrum/sprints`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "teamid": teamid,
      "startDate": startDate,
      "endDate": endDate,
    }),
  });

  
  if (response.ok) {
    return response;
  } 
}

const stateMap = {
  1: "TODO",
  2: "IN_PROGRESS",
  3: "REVIEW",
  4: "DONE",
};

export async function updateScrumBoard(tasks) {
  console.log("Initial data: ", tasks)
  const updated = Object.values(tasks).map((task) => ({
      ...task,
      state: stateMap[task.state],
    })
  );

  const updateRequests = updated.map((task) => {
    const res = fetch(`${baseUrl}/scrum/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
  })

  console.log("Updated: ", updated)
  return updateRequests;
}