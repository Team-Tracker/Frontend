import { Rubik } from "next/font/google";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata = {
  title: "Add sprint",
  description: "Add sprint",
};

export default function RootLayout({ children }) {
  return (
    <div className="add-sprint">
      <div>{children}</div>
    </div>
  );
}
