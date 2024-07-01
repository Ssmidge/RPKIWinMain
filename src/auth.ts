/* eslint-disable import/no-cycle */
import NextAuth, { CredentialsSignin, User } from 'next-auth';
import 'next-auth/jwt';
import Credentials from 'next-auth/providers/credentials';
import type { Provider } from 'next-auth/providers';
import bcrypt from 'bcrypt';
import { createAvatar } from '@dicebear/core';
import { identicon } from '@dicebear/collection';
import { authConfig } from './auth.config';
import prisma from './lib/prismaClient';

export class InvalidLoginError extends CredentialsSignin {
  constructor(message: string, actualErrorMessage?: string) {
    super(actualErrorMessage);
    this.code = `Invalid email or password${message}`;
  }
}

export const providers : Provider[] = [
  Credentials({
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    credentials: {
      email: {},
      password: {},
    },
    async authorize(credentials: any) {
      let user : User | null = null;

      // logic to salt and hash password
      const pwHash = await credentials.password;

      const avatar = createAvatar(identicon, {
        seed: credentials.email,
      });

      if (credentials.email === 'a@a.com' && pwHash === 'password') {
        user = {
          id: String(1),
          email: 'a@a.com',
          name: 'John Doe',
          image: avatar.toDataUri(),
        };
      }

      // try {
      //   user = await prisma.user.findFirst({
      //     where: {
      //       email: credentials.email,
      //       hashedPassword: pwHash,
      //     },
      //   });

      //   return user;
      // } catch (error) {
      //   throw new InvalidLoginError(`&email=${credentials.email}`);
      // }
      if (!user) {
        throw new InvalidLoginError(`&email=${credentials.email}`);
      }
      return user;
    },
  }),
];

export const providerMap = providers.map((provider) => {
  if (typeof provider === 'function') {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  }
    return { id: provider.id, name: provider.name };
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers,
});

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
