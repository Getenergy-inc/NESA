import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      isAdmin: boolean;
      role: string;
      token?: string;
      accessToken?: string;
    };
    accessToken?: string;
  }

  interface User {
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    role: string;
    token?: string;
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    isAdmin: boolean;
    role: string;
    token?: string;
    accessToken?: string;
  }
}