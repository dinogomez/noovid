import { siteConfig } from "@/commons/config";
import { SessionOptions } from "iron-session";

export interface SessionData {
  username: string;
  email: string;
  isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
  username: "",
  email: "",
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_KEY || "",
  cookieName: process.env.SESSION_NAME || siteConfig.title,
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
};
