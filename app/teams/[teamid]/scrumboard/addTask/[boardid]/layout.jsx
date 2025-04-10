import { Rubik } from "next/font/google";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata = {
  title: "Add Task",
  description: "Add task",
};

export default function addTaskLayout({ children }) {
  return (
    <div className="add-task">
      <div>{children}</div>
    </div>
  );
}
