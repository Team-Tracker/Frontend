import { Rubik } from "next/font/google";
import { Provider } from "@/components/ui/provider";

import "./globals.css";
import localFont from "next/font/local";

// components
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import BodyWrapper from "./components/BodyWrapper";

const rubik = Rubik({ subsets: ["latin"] });

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Home",
  description: "Home Page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="root-layout">
        <Navbar />
        <Sidebar />
        <div className="main-content">
          <Provider>{children}</Provider>
        </div>
      </body>
    </html>
  );
}

