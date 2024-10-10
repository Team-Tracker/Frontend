import { Rubik } from "next/font/google";
import "./login.css";
import localFont from "next/font/local";

// components


const rubik = Rubik({ subsets: ["latin"] });

export const metadata = {
  title: "Login",
  description: "Login layout",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        <div className="main-content">{children}</div>
      </body>
    </html>
  );
}
