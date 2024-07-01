'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { CredentialsSignin } from 'next-auth';
import { InvalidLoginError, signIn as signInUser } from '@/auth';
import prisma from '@/lib/prismaClient';

// =============================== signIn ===============================
const signInSchema = z.object({
  email: z.string().email().min(3, { message: 'Must be 3 or more characters long' }),
  password: z.string().min(8, { message: 'Must be 8 or more characters long' }),
});
export async function signIn(values: any) {
  const validatedFields = signInSchema.safeParse({
    email: values.email,
    password: values.password,
  });

  if (!validatedFields.success) {
    return {
      error: {
        message: validatedFields.error.errors[0].message,
        email: values.email,
      },
    };
  }

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
            // const email = code.split('&email=')[1];

            return {
                error: {
                    message,
                    email: validatedFields.data.email,
                },
            };
            break;
        }
        case CredentialsSignin: {
          return {
            error: {
                message: 'Invalid email or password',
            },
        };
        }
        default: {
          if (!(error instanceof CredentialsSignin)) throw error;
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
