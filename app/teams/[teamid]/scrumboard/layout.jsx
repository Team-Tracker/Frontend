import { Rubik } from "next/font/google";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata = {
  title: "Scrum board",
  description: "Scrum board",
};

export default function TeamLayout({ children }) {
  return (
      <div>{children}</div>
  );
}
