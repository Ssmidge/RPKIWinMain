'use server';

import { redirect } from 'next/navigation';
import { InvalidLoginError, signIn as signInUser } from '@/auth';

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
