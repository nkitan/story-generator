import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import db from '@/lib/db';
import { users } from '@/schemas/users';
import { eq } from 'drizzle-orm';

// Extend the default session to include the role
declare module 'next-auth' {
  interface Session {
    user: {
      email?: any;
      role?: string;
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      try {
        const userRecord = await db
          .select()
          .from(users)
          .where(eq(users.email, session?.user?.email));

        if (session?.user) {
          session.user.role = userRecord[0]?.role ?? 'user';
          session.user.email = userRecord[0]?.email ?? "no-email@example.com";
        }
        return session;
        
      } catch (error) {
        console.error('Session callback error:', error);
        return session; // Return the session without modifications in case of error
      }
    },  
  },
  pages: {
    signIn: '/auth/signin',
  },
};

export const POST = NextAuth(authOptions);