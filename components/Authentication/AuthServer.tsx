"use server"

import { signIn } from "@/auth"
import { isRedirectError } from "next/dist/client/components/redirect";

export async function SignInServer(values: any) {
    try {
        await signIn("credentials", values);
    } catch (error) {
        if (isRedirectError(error)) throw error;
    }
}

export async function SignOutServer() {
    try {
        await signIn("signout");
    } catch (error) {
        if (isRedirectError(error)) throw error;
    }
}