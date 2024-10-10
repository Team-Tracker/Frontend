export async function loginUser(username, password) {
    const response = await fetch(
      `http://geyser.sytes.net:1234/user/login?username=${username}&password=${password}`,
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
