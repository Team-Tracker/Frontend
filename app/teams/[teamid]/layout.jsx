import { Rubik } from "next/font/google";
import ConditionalTeamsMenuBar from "../../components/Teams/ConditionalTeamsMenuBar"
import { MenuProvider } from "./MenuContext";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata = {
  title: "Team",
  description: "Team",
};

export default function TeamLayout({ children }) {
  return (
    <MenuProvider>
      <div className="team-navbar">
        <ConditionalTeamsMenuBar /> {/* This component now handles the conditional rendering */}
      </div>
      <div className="team-content">{children}</div>
    </MenuProvider>
  );
}
