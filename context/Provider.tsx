'use client'
import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"
import { Session } from "next-auth"

interface ProviderProps {
  children: ReactNode;
  session?: Session | null | undefined;
}

const AuthProvider = ({ children }: ProviderProps) => {
  return (
    <SessionProvider >
      {children}
    </SessionProvider>
  )
}

export default AuthProvider