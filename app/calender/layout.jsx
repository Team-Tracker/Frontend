// layout.jsx
import { Rubik } from "next/font/google";
import fetchUsers from "@/app/services/saveUsers"; // Import fetchUsers
import ClientProvider from "./ClientProvider"; // Adjust if file location differs

const rubik = Rubik({ subsets: ["latin"] });

export const metadata = {
  title: "Calendar",
  description: "Calendar",
};

export default async function CalendarLayout({ children }) {
  const users = await fetchUsers(); // Fetch users server-side

  return (
    <div className={rubik.className}>
      <ClientProvider users={users}>{children}</ClientProvider>
    </div>
  );
}
