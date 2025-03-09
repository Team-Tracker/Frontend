import { Rubik } from "next/font/google";
import "./register.css";
import localFont from "next/font/local";

import React from "react";

// components


const rubik = Rubik({ subsets: ["latin"] });

export const metadata = {
  title: "Register",
  description: "Register layout",
};

export default function LoginLayout({ children }) {
  return (
        //<div className="login-layout">{React.cloneElement(children, { childFromLogin: true })}</div>
          <>{children}</>
  );
}

