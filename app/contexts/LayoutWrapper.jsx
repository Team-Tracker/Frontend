"use client"; // This must be a client component!

import { useLayout } from "./LayoutContext";
import Navbar from "./../components/Navbar";
import Sidebar from "./../components/Sidebar";

export default function LayoutWrapper({ children }) {
  const { layout } = useLayout();

  return layout === "login" ? (
    <div className="login-layout">{children}</div>
  ) : (
    <div className="root-layout">
      <Navbar />
      <Sidebar />
      <div className="main-content">{children}</div>
    </div>
  );
}
