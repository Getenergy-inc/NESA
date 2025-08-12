import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "<EMAIL>" },
        password: { label: "Password", type: "password" },
      },
      async authorize() {
        // logic for logging in
        return null;
      },
    }),
  ],
};

export default authOptions;
