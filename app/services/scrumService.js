const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function fetchSprintList(teamId) {
  const response = await fetch(`${baseUrl}/scrum/sprints`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
  });
  
  if (!response.ok) {
      throw new Error("Failed to get sprints");
  }

  const sprints = await response.json();
  return sprints.filter(sprint => sprint.teamid === teamId);
}
