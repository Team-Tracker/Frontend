"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function BodyWrapper({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/login")) {
      document.body.classList.add("login-body");
    } else {
      document.body.classList.remove("login-body");
    }
  }, [pathname]);

  return <>{children}</>;
}
