"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { loginUser } from "../services/loginService";
import { getUserId } from "../services/userinfo";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage(""); // Clear any previous error message
    setLoading(true); // Show loading state (disable button)

    if (!username || !password) {
      setErrorMessage("Please fill in both fields.");
      setLoading(false); // Stop loading state
      return; // Stop further execution
    }

    // Get the session ID from local storage or cookies if it exists
    // const sessionId = localStorage.getItem('sessionId');

    /**
     * It sends a request if the user with the password exists, if yes,
     * it sets a cookie with the username, to clobaly access the data
     * if needed in a request (for chat, teams, ect.)
     *
     * TODO: Session Management will be added later
     *
     * TODO: Rather check here if user has a session, or not
     * or look if there is something avaiable in the middleware.js
     *
     * TODO: remove session.js in middleware.js and delete lib/session.js
     */

    const verifylogin = await loginUser(username, password);
    console.log("Login data: ", verifylogin);
    setLoading(false);

    if (verifylogin.ok) {
      // const response = await loginResponse.json();
      // const jwt = response.token;

      //sessionStorage.setItem("jwt", jwt);

      document.cookie = `username=${username}; path=/; max-age=3600;`;
      console.log("Cookie set...")

      const idresponse = await getUserId(username);
      console.log("ID Response ", idresponse)

      if (!idresponse.ok) {
        const errorData = await idresponse.json();
        setErrorMessage(errorData.message || "Failed to fetch user info.");
        setLoading(false);
        return;
      }

      const userId = await idresponse.json();
      console.log("UserId: ", userId);

      document.cookie = `userId=${userId}; path=/; max-age=3600;`;

      setTimeout(() => {
        // console.log("Pushing to '/teams'");
        router.push("/teams");
      }, 500);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-extrabold text-center text-gray-900">
          Sign in to your account
        </h2>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm">
            <label htmlFor="username" className="sr-only">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="text-white relative block w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="username"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="text-white relative block w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
