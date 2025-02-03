import { Rubik } from "next/font/google";

import localFont from "next/font/local";

import Navbar from "./../../../components/Navbar";
import Sidebar from "./../../../components/Sidebar";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata = {
  title: "Scrum board",
  description: "Scrum board",
};

export default function TeamLayout({ children }) {
  return (
    <html lang="en">
      <body className="root-layout">
        <Navbar />
        <Sidebar />
        <div className="main-content">
          <div>{children}</div>
        </div>
      </body>
    </html>
  );
}
