export async function loginUser(username, password) {
    const response = await fetch(
      `http://geyser.sytes.net:1234/main/login`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        // body: JSON.stringify({ username, password, sessionId })
      }
    );

    if (!response.ok) {
      throw new Error("Login failed");
    }

    return response;
}
