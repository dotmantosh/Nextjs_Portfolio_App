"use client"
import { Children, FunctionComponent, ReactElement, ReactNode } from 'react'
import { Container } from 'reactstrap'
import Head from 'next/head'
import AppHeader from './AppHeader'
import AppFooter from './Footer'
import NextTopLoader from "nextjs-toploader";
import { Toaster } from 'sonner'
import { usePathname, useRouter } from 'next/navigation'


interface LayoutProps {
  children?: ReactNode;
}

const NoAuth = ["/", "/signup", "/login"]
const AppLayout: FunctionComponent<LayoutProps> = ({ children }): ReactElement => {
  const currentPath = usePathname();
  return (
    <>
      <Head>
        <title>My Portfolio Website</title>
      </Head>
      <NextTopLoader
        // color="#E96209"
        color="#13B0F5"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl={true}
        showSpinner={true}
        easing="ease"
        speed={200}
        shadow="0 0 10px #f7a738,0 0 5px #b75412"
      />
      <Toaster
        position="bottom-center"
        richColors
        closeButton
        toastOptions={{
          duration: 3000,
          unstyled: false,
        }}
      />

      {
        NoAuth.includes(currentPath) ?
          <>
            <AppHeader />
            {children}
          </>
          :
          <Container>
            <AppHeader />
            {children}
            <AppFooter />
          </Container>
      }

    </>
  )
}

export default AppLayout
