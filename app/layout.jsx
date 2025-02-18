import { Rubik } from "next/font/google";
import { Provider } from "@/components/ui/provider";
import { LayoutProvider, useLayout } from "./contexts/LayoutContext";
import LayoutWrapper from "./contexts/LayoutWrapper";

import "./globals.css";
import localFont from "next/font/local";

// components
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

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
      <body>
      <LayoutProvider>
          <Provider>
            <LayoutWrapper>{children}</LayoutWrapper> {/* Now inside the provider */}
          </Provider>
        </LayoutProvider>
      </body>
    </html>
  );
}
