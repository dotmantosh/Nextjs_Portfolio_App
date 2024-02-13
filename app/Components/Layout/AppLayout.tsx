"use client"
import { Children, FunctionComponent, ReactElement, ReactNode } from 'react'
import Head from 'next/head'
import AppHeader from './AppHeader'
import AppFooter from './Footer'
import { Layout } from 'antd'

const {Header, Footer, Content} = Layout

interface LayoutProps {
  children?: ReactNode;
}

const AppLayout:FunctionComponent<LayoutProps> = ({children}):ReactElement => {
  return (
    <>
      <Head>
        <title>My Portfolio Website</title>
      </Head>
      <Layout className='layout'>
        <Header className="antHeader">
          <AppHeader/>
        </Header>
        <Content>{children}</Content>
        
      <Footer>
        <AppFooter/>
      </Footer>
      </Layout>
      
    </>
  )
}

export default AppLayout
