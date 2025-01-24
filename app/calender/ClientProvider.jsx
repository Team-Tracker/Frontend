// /calendar/ClientProvider.jsx
"use client";

import { createContext, useContext } from "react";

// Create a context for users
const UsersContext = createContext([]);

// Custom hook to consume the context
export const useUsers = () => {
    const context = useContext(UsersContext);
    if (!context) {
      throw new Error("useUsers must be used within a UsersContext.Provider");
    }
    return context;
  };

export default function ClientProvider({ children, users }) {
  return (
    <UsersContext.Provider value={users}>
      {children}
    </UsersContext.Provider>
  );
}
