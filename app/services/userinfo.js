const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export async function getUserId(username) {
    const response = await fetch(
      `${baseUrl}/user/resolveId?username=${username}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      throw new Error("Login failed");
    }

    return response;
}

export async function getUserName(user_id) {
  const response = await fetch(
    `${baseUrl}/user/resolveUsername?id=${user_id}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response;
}
