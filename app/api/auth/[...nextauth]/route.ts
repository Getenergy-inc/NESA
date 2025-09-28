import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// Export a dynamic route handler instead of a static one
// This helps avoid the "i is not a constructor" error during build
const handler = NextAuth(authOptions);

// Use dynamic exports to prevent build-time evaluation
export const GET = handler;
export const POST = handler;