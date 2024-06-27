/* eslint-disable no-duplicate-case */

'use server';

import { AuthError, NextAuthResult } from 'next-auth';
import { isRedirectError } from 'next/dist/client/components/redirect';
import { signIn, signOut } from '@/auth';

export async function SignInServer(values: any, callBackUrl: string = '/dashboard') {
    try {
        const attempt = await signIn('credentials', {
            // redirectTo: callBackUrl,
            // redirect: true,
            ...values,
        });

        return attempt;
    } catch (error) {
        if (isRedirectError(error)) throw error;
    }
}

export async function SignOutServer() {
    try {
        await signOut({
            redirect: true,
            redirectTo: '/',
        });
    } catch (error) {
        if (isRedirectError(error)) throw error;
    }
}
