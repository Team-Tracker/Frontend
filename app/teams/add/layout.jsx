import { Rubik } from "next/font/google";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata = {
  title: "Add team",
  description: "Add team",
};

export default function RootLayout({ children }) {
  return (
        <div className="add-team">
          <div>{children}</div>
        </div>
  );
}
