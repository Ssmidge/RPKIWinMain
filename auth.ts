import NextAuth from "next-auth";
import "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
// import bcrypt from "bcrypt"

 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials: any) => {
        let user = null
 
        // logic to salt and hash password
        const pwHash = await saltAndHashPassword(credentials.password)
        console.log(pwHash, credentials.email)
 
        // logic to verify if user exists
        user = await getUserFromDb(credentials.email, pwHash)
        if (!user) {
          throw new Error("No user found")
        }
 
        // return user object with the their profile data
        return user;
      },
    }),
  ],
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      if (pathname === "/dashboard") return !!auth
      return true
    },
    jwt({ token, trigger, session, account }) {
      if (trigger === "update") token.name = session.user.name
      return token
    },
    async session({ session, token }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    }
  },
  pages: {
    signIn: "/auth/signin",
  },
})

async function saltAndHashPassword(password: string) {
  // logic to salt and hash password
  // const salt = await bcrypt.genSalt(10);
  // const hash = await bcrypt.hash(password, salt);
  return password;
}

async function getUserFromDb(email: string, password: string) {
  // logic to verify if user exists
  console.log(email, password)
  if(email == "a@a.com" && password == "password") {
    return {
      email: email,
      name: email,
      password: password,
    }
  } else {
    return {};
  }
}

declare module "next-auth" {
  interface Session {
    accessToken?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
  }
}