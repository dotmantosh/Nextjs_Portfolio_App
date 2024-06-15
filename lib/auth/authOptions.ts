import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { AuthService } from "../../app/api/authService"


interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  imageUrl: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  token: string
}

interface TokenUser {
  user: User
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password", placeholder: "Password" }
      },
      async authorize(credentials) {

        try {
          const user = (await AuthService.LoginUser({ email: credentials?.email, password: credentials?.password })).data
          if (!user) throw new Error("Invalid credentials")
          const loggedUser = user.user
          const token = user.token
          return { ...loggedUser, token }
        } catch (error) {
          console.log(error)
        }
      }
    })
  ],

  callbacks: {
    // Create and manage JWTs here
    jwt: ({ token, user }) => {
      // console.log("JWT Callback", { token, user });

      if (user) { // Check if user and token properties exist
        token.user = user

        // token.id = user._id;
        // token.username = user.username;
        // token.email = user.user.email;
        // token.role = user.user.role;
        // token.emailVerified = user.user.emailVerified;
        // token.createdAt = user.user.createdAt;
        // token.updatedAt = user.user.updatedAt;
        // token.accessToken = user.token; // Include token returned from API
        // console.log(user)
      }

      return token;
    },

    // Create and manage sessions here
    session: ({ session, token }) => {
      // console.log("Session Callback", { session, token });
      const { user } = token
      return {
        ...session,
        user: {
          ...user as any
        },
      };
    },
  },

  session: {
    strategy: 'jwt',
    maxAge: 23 * 60 * 60,
    updateAge: 0,
  },

  secret: process.env.NEXTAUTH_SECRET!,
  debug: process.env.NODE_ENV === "development"
}
