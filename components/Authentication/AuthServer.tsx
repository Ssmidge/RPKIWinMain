"use server"

import { signIn, signOut } from "@/auth"
import { NextAuthResult } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect";

export async function SignInServer(values: any, callBackUrl: string = "/dashboard") {
    try {
        await signIn("credentials", {
            redirectTo: callBackUrl,
            redirect: true,
            ...values,
        });
    } catch (error) {
        if (isRedirectError(error)) throw error;
    }
}

export async function SignOutServer() {
    try {
        await signOut({
            redirect: true,
            redirectTo: "/",
        });
    } catch (error) {
        if (isRedirectError(error)) throw error;
    }
}