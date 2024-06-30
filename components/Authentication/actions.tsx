'use server';

import { redirect } from 'next/navigation';
import { InvalidLoginError, signIn as signInUser } from '@/auth';
import prisma from '@/lib/prismaClient';

// =============================== signIn ===============================
export async function signIn(values: FormData) {
  try {
    await signInUser('credentials', {
      ...values,
      redirect: true,
      redirectTo: '/dashboard',
    });
  } catch (error: any) {
    // error instance check
    switch (error.constructor) {
        case InvalidLoginError: {
            const { code } = error as InvalidLoginError;
            const message = code.split('&email=')[0];
            const email = code.split('&email=')[1];

            return {
                error: {
                    message,
                    email,
                },
            };
            break;
        }
        default: {
            throw error;
            break;
        }
    }
  }
  return redirect('/dashboard');
}
// =============================== signUp ===============================
export async function signUp(email : string, password : string) {
  const existingUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (existingUser) return { error: { message: 'User already exists' } };

  const userRole = await prisma.role.findFirst({ where: { name: 'User' } });

  const user = await prisma.user.create({
    data: {
      email,
      hashedPassword: password,
      role: {
        connect: {
          id: userRole?.id,
        },
      },
    },
  });

  return { user };
}
