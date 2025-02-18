export default async function fetchUsers(user_id) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

  try {
    const response = await fetch(`${baseUrl}/user/others?id=${user_id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      // If response status is not OK, throw an error
      throw new Error(`Server responded with status: ${response.status}`);
    }

    console.log("Response users: ", response)

    const users = await response.json();
    console.log("Fetched users: ", users)

    const filteredUsers = users.map(({ id, username }) => ({ id, username }));

    console.log("Filtered users: ", filteredUsers);
    
    return filteredUsers;
  } catch (error) {
    console.error("Fetch error:", error.message);

    return [
      { id: 1, username: "static_user_1" },
      { id: 2, username: "static_user_2" },
    ];
  }
}