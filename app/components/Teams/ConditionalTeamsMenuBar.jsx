"use client";

import { usePathname } from "next/navigation";
import TeamsMenuBar from "@/app/components/TeamsMenuBar";

export default function ConditionalTeamsMenuBar() {
  const pathname = usePathname();

  // Hide the navbar when in `/[teamid]/scrum`
  if (pathname.includes("/scrum")) return null;

  return <TeamsMenuBar />;
}
