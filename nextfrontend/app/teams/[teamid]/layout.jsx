import { Rubik } from "next/font/google";

import localFont from "next/font/local";

import TeamsMenuBar from "@/app/components/TeamsMenuBar";

const rubik = Rubik({ subsets: ["latin"] });


export const metadata = {
  title: "Team",
  description: "Team",
};

export default function TeamLayout({ children }) {
  return (
    <div className="flex h-screen">
        <div className="team-navbar"> 
            <TeamsMenuBar/>
        </div>        
        <div>

        </div>
        <div className="team-content">
            {children}
        </div>
    </div>

  );
}
