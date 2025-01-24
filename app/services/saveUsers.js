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

    const users = await response.json();
    return users;
  } catch (error) {
    console.error("Fetch error:", error.message);

    return [
      { id: 1, username: "static_user_1" },
      { id: 2, username: "static_user_2" },
    ];
  }
}