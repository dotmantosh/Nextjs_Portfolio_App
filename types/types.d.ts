import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by useSession, getSession and received as a prop on the SessionProvider React Context
   */
  interface Session {
    user: {
      id: string | null | undefined;
      name: string | null | undefined;
      email: string | null | undefined;
      image: string | null | undefined;
      username: string | null | undefined;
      idToken: string | null | undefined;
      token: string | null | undefined;
      // token: string
    }
  }

  interface User {
    accessToken: string | null | undefined;
  }
}