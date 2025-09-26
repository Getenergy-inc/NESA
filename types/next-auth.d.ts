import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string;
      email: string;
      image?: string | null;
      isAdmin?: boolean;
      role?: string;
    };
    accessToken?: string;
  }

  interface User {
    id: string;
    name?: string;
    email: string;
    image?: string | null;
    isAdmin?: boolean;
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name?: string;
    email?: string;
    picture?: string;
    isAdmin?: boolean;
    role?: string;
    accessToken?: string;
  }
}