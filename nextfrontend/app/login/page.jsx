"use client"

import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    // Get the session ID from local storage or cookies if it exists
    const sessionId = localStorage.getItem('sessionId');

    /**
     * TODO: Rather check here if user has a session, or not
     * or look if there is something avaiable in the middleware.js
     * 
     * TODO: remove session.js in middleware.js and delete lib/session.js
     */
    
    const response = await fetch('http://localhost:8000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, sessionId })
    });

    if (response.ok) {
      const data = await response.json();
      const newSessionId = data.sessionId;

      // Store sessionId in local storage or cookies
      localStorage.setItem('sessionId', newSessionId);

      // Navigate to profile page
      router.push('/');
    } else {
      alert('Invalid login credentials');
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-extrabold text-center text-gray-900">Sign in to your account</h2>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input 
                id="email" 
                name="email" 
                type="email" 
                required 
                className="relative block w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                placeholder="Email address" 
              />
            </div>
            <div className="mt-4">
              <label htmlFor="password" className="sr-only">Password</label>
              <input 
                id="password" 
                name="password" 
                type="password" 
                required 
                className="relative block w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                placeholder="Password" 
              />
            </div>
          </div>
          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
