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
      async authorize(credentials, req) {
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
            image: null,
            isAdmin: true,
            role: 'admin',
            accessToken: 'admin-token' // Dummy token for admin
          };
        }

        // For non-admin users, try the regular login
        try {
          const response = await login(credentials);
          const { user, token } = response;
          
          if (user && token) {
            // Ensure we return a valid User object that matches NextAuth's User type
            // Store only the properties expected by NextAuth User type
            return {
              id: user.id,
              name: user.name || user.email.split('@')[0],
              email: user.email,
              image: user.image || null,
              // Add these properties so they can be stored in the JWT
              accessToken: token,
              isAdmin: user.isAdmin || false,
              role: user.role || 'user'
            };
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
    async jwt({ token, user, account }) {
      if (user) {
        // Store user information in the token
        token.id = user.id;
        
        // Handle admin-specific properties
        if ((user as any).isAdmin) {
          token.isAdmin = true;
          token.role = 'admin';
        } else if ((user as any).role) {
          token.role = (user as any).role;
          token.isAdmin = (user as any).role === 'admin';
        }
        
        // Store access token if available
        if ((user as any).accessToken) {
          token.accessToken = (user as any).accessToken;
        } else if (account?.access_token) {
          token.accessToken = account.access_token;
        }
        
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
        // Add custom properties to the session user object
        session.user.id = token.id as string;
        
        // Add admin and role information
        session.user.isAdmin = !!token.isAdmin;
        session.user.role = token.role as string || 'user';
        
        // Add access token to the session
        if (token.accessToken) {
          session.accessToken = token.accessToken;
        }
        
        // Log session creation for debugging
        console.log('Session created:', { 
          id: session.user.id,
          isAdmin: session.user.isAdmin,
          role: session.user.role
        });
      }
      return session;
    },
  },
  pages: {
    signIn: '/account/login',
    error: '/api/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET || 'nesa-nextauth-secret-key-2025',
};