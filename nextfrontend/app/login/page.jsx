"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginUser } from "../services/loginService";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage(''); // Clear any previous error message
    setLoading(true); // Show loading state (disable button)

    if (!username || !password) {
      setErrorMessage('Please fill in both fields.');
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

    // const data = await response.json();
    // const newSessionId = data.sessionId;

    // Store sessionId in local storage or cookies
    // localStorage.setItem('sessionId', newSessionId);

    // Set cookie with the username (username in this case)
    document.cookie = `username=${username}; path=/; max-age=3600;`; // Cookie will last for 1 hour

    // Navigate to home page
    console.log("Pushing to '/'");
    router.push("/");
    // Force reload if necessary
    console.log("Reloading...");
    router.refresh();
    console.log("Finished reloading :)")
    // console.log("Pushing to '/'");
    // router.push("/");
    // console.log("Reloading...");
    // router.reload();
    // console.log("Finished reloading :)")
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-extrabold text-center text-gray-900">
          Sign in to your account
        </h2>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm">
            <div>
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
                className="relative block w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                className="relative block w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
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
