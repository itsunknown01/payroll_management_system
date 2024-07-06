import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

interface NextAuthProviderProps {
    session: Session | null,
    children: React.ReactNode
}

const NextAuthProvider = ({session,children}: NextAuthProviderProps) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default NextAuthProvider
