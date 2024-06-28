import { NextAuthConfig } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/lib/prismaClient';

import { auth } from './auth';

export const authConfig = {
    adapter: PrismaAdapter(prisma),
    session: { strategy: 'jwt' },
    callbacks: {
        authorized({ request }) {
          const { pathname } = request.nextUrl;
          if (pathname === '/dashboard') return !!auth;
          return true;
        },
        jwt({ token, trigger, session }) {
          if (trigger === 'update') token.name = session.user.name;
          return token;
        },
        async session({ session, token }) {
          if (token?.accessToken) {
            session.accessToken = token.accessToken;
          }
          return session;
        },
        async redirect({ url, baseUrl }) {
          // Allows relative callback URLs
          if (url.startsWith('/')) return `${baseUrl}${url}`;
          // Allows callback URLs on the same origin
          if (new URL(url).origin === baseUrl) return url;
          return baseUrl;
        },
      },
      pages: {
        signIn: '/auth/signin',
        error: '/auth/signin',
      },
      providers: [],
} satisfies NextAuthConfig;
