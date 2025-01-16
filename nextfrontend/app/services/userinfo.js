export async function getUserId(username) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
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
