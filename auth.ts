import NextAuth, { CredentialsSignin } from 'next-auth';
import 'next-auth/jwt';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import prisma from './lib/prismaClient';

class InvalidLoginError extends CredentialsSignin {
  constructor(message: string, actualErrorMessage?: string) {
    super(actualErrorMessage);
    this.code = `Invalid email or password${message}`;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials: any) {
        let user = null;

        // logic to salt and hash password
        const pwHash = await saltAndHashPassword(credentials.password);

        // logic to verify if user exists
        user = await getUserFromDb(credentials.email, pwHash);
        if (!user) {
          throw new InvalidLoginError(`&email=${credentials.email}`, undefined);
        }

        // return user object with the their profile data
        return user;
      },
    }),
  ],
});

async function saltAndHashPassword(password: string) {
  return password;
}

async function getUserFromDb(email: string, password: string) {
  return null;
}

declare module 'next-auth' {
  interface Session {
    accessToken?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string
  }
}
