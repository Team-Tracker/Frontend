import { Rubik } from "next/font/google";
import "./login.css";
import localFont from "next/font/local";

// components


const rubik = Rubik({ subsets: ["latin"] });

export const metadata = {
  title: "Login",
  description: "Login layout",
};

export default function LoginLayout({ children }) {
  return (
    <html lang="en">
      <body className="login-layout">
        <div>{children}</div>
      </body>
    </html>
  );
}

