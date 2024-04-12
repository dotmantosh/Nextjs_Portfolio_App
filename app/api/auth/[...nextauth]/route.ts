


import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"
import { AuthService } from "../../authService"
import { Adapter } from "next-auth/adapters"
import { PrismaAdapter } from "@auth/prisma-adapter"
import axios from "axios"
// import prisma from "@/prisma"

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password", placeholder: "Password" }
      },
      async authorize(credentials) {
        // try {
        //   let existingUser;
        //   // console.log(credentials)
        //   if (!credentials) {
        //     return null; // Return null if no credentials are provided
        //   }

        //   const { user, token } = (await AuthService.LoginUser({ email: credentials.email, password: credentials.password })).data
        //   // const user = { _id: "1", email: "dotman@email.com" }
        //   // const token = "sdkfjsdkfs"
        //   // console.log(user)
        //   await prisma.$connect()
        //   // Check if the user exists in the database

        //   existingUser = await prisma.user.findUnique({
        //     where: { email: user.email }
        //   })
        //   console.log(existingUser)
        //   // If user exists, return the existing user
        //   if (existingUser) {
        //     console.log("igote")
        //     existingUser.accessToken = token;
        //     existingUser = await prisma.user.update({
        //       where: { id: existingUser.id },
        //       data: {
        //         accessToken: token
        //         // Add other properties to update here if needed
        //       }
        //     });
        //     return existingUser;
        //   } else {
        //     console.log("i got here")
        //     // If user does not exist, create a new user
        //     const newUser = await prisma.user.create({
        //       data: {
        //         email: user.email,
        //         userId: user._id,
        //         accessToken: token
        //         // You can set other user properties here
        //       }
        //     })
        //     console.log(newUser)

        //     return newUser;
        //   }
        // } catch (error) {
        //   console.log(error)
        //   // Handle authentication errors
        //   throw new Error("Authentication failed")
        // } finally {
        //   await prisma.$disconnect()
        // }

        const user = { id: "1", email: credentials?.email, password: credentials?.password }
        return user
      }
    })
  ],
  // callbacks:{
  //   async jwt({token, user}){
  //     if (user) token.accessToken = user.token
  //   },
  //   async session({session, token}) {
  //     if(session?.user) session.user.accessToken = user.accessToken
  //   }
  // },
  session: {
    strategy: 'jwt',
    maxAge: 23 * 60 * 60,
    updateAge: 0,
  },

  secret: process.env.NEXTAUTH_SECRET!,
  debug: process.env.NODE_ENV === "development"
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }