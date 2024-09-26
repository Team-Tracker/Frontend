import { getIronSession } from "iron-session";

const sessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD, // Ensure this is set in your .env file
  cookieName: "myapp_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
  },
};

// Function to decrypt the session from a cookie
export async function decrypt(cookie) {
  if (!cookie) return null;

  // Mock the request and response objects needed for iron-session
  const req = { cookies: { session: cookie } };
  const res = {};

  // Use iron-session to decrypt the session cookie
  const session = await getIronSession(req, res, sessionOptions);

  return session;
}

export default sessionOptions;
