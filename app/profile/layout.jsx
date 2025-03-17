import { Rubik } from "next/font/google";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata = {
  title: "Profile",
  description: "Profile",
};


export default async function ChatLayout({ children }) {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-900">
        {children}
    </div>
  );
}
