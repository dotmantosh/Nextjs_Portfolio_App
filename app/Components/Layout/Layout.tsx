"use client"
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { Children, FunctionComponent, ReactElement, ReactNode } from 'react'
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
  children?: ReactNode;
}

const Layout:FunctionComponent<LayoutProps> = ({children}):ReactElement => {
  return (
    <>
      <Head>
        <title>My Portfolio Website</title>
      </Head>
      <Header/>
        {children}
      <Footer/>
    </>
  )
}

export default Layout
