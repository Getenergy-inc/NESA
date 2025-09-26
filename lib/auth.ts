import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { login } from '@/lib/services/authService';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        // Hardcoded admin credentials for development
        // In production, these should come from environment variables
        const adminUsername = 'admin';
        const adminPassword = 'nesa2025admin';

        console.log('Admin login attempt:', {
          inputEmail: credentials.email,
          adminUsername,
          passwordMatch: credentials.password === adminPassword,
        });

        // If credentials match admin credentials, return admin user
        if (credentials.email === adminUsername && credentials.password === adminPassword) {
          console.log('Admin login successful');
          return {
            id: 'admin-user',
            name: 'Admin User',
            email: adminUsername,
            isAdmin: true,
            role: 'admin',
            accessToken: 'nesa-admin-token-2025'
          };
        }

        // For non-admin users, try the regular login
        try {
          const { user, token } = await login(credentials);
          if (user && token) {
            return { ...user, accessToken: token };
          }
          return null;
        } catch (error) {
          console.error('Authorization error:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = (user as any).isAdmin || (user as any).role === 'admin';
        token.accessToken = (user as any).accessToken;
        token.role = (user as any).role;
        
        // Log token creation for debugging
        console.log('JWT token created:', { 
          id: token.id,
          isAdmin: token.isAdmin,
          role: token.role
        });
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).isAdmin = token.isAdmin as boolean;
        (session.user as any).role = token.role as string;
        (session as any).accessToken = token.accessToken;
        
        // Log session creation for debugging
        console.log('Session created:', { 
          id: (session.user as any).id,
          isAdmin: (session.user as any).isAdmin,
          role: (session.user as any).role
        });
      }
      return session;
    },
  },
  pages: {
    signIn: '/account/login',
    error: '/account/login',
  },
  secret: 'nesa-nextauth-secret-key-2025',
};