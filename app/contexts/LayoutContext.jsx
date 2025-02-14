"use client";

import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const LayoutContext = createContext();

export function LayoutProvider({ children }) {
  const pathname = usePathname();
  const [layout, setLayout] = useState("root");

  useEffect(() => {
    if (pathname.startsWith("/login")) {
      setLayout("login");
    } else {
      setLayout("root");
    }
  }, [pathname]);

  return (
    <LayoutContext.Provider value={{ layout }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  return useContext(LayoutContext);
}
