const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function fetchSprintList(teamId) {
    const response = await fetch(`${baseUrl}/chat/chats?userId=${teamId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Failed to get sprints");
      }
    
      return response;
}