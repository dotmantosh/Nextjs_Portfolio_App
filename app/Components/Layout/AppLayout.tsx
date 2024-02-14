"use client"
import { Children, FunctionComponent, ReactElement, ReactNode } from 'react'
import { Container } from 'reactstrap'
import Head from 'next/head'
import AppHeader from './AppHeader'
import AppFooter from './Footer'


interface LayoutProps {
  children?: ReactNode;
}

const AppLayout: FunctionComponent<LayoutProps> = ({ children }): ReactElement => {
  return (
    <>
      <Head>
        <title>My Portfolio Website</title>
      </Head>
      <Container>
        <AppHeader />
        {children}
        <AppFooter />
      </Container>

    </>
  )
}

export default AppLayout
