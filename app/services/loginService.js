export async function loginUser(username, password) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const response = await fetch(
    `${baseUrl}/auth/login?username=${username}&password=${password}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }
  );

  return response;
}

export async function registerUser(username, password) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const response = await fetch(
    `${baseUrl}/main/add?username=${username}&password=${password}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }
  );

  return response;
}
