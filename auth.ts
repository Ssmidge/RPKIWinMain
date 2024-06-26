import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
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
 
        // logic to verify if user exists
        user = await getUserFromDb(credentials.email, pwHash)
 
        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("User not found.")
        }
 
        // return user object with the their profile data
        return user
      },
    }),
  ],
})

async function saltAndHashPassword(password: string) {
  // logic to salt and hash password
  // const salt = await bcrypt.genSalt(10);
  // const hash = await bcrypt.hash(password, salt);
  return password;
}

async function getUserFromDb(email: string, password: string) {
  // logic to verify if user exists
  return {
    email: email,
    name: email,
    password: password,
  }
}