"use client";

import { createContext, useState, useContext } from "react";

const MenuContext = createContext();

export function MenuProvider({ children }) {
  const [selectedAction, setSelectedAction] = useState({
    enableTasks: true,
    enableChat: true,
    enableMemberList: true,
  });

  return (
    <MenuContext.Provider value={{ selectedAction, setSelectedAction }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  return useContext(MenuContext);
}
