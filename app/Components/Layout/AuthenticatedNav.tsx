import React from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'
import styles from '../../Styles/_header.module.scss'
import { usePathname, useRouter } from 'next/navigation'
import { AuthService } from '@/app/api/authService'
import { signOut, useSession } from 'next-auth/react'
import { GithubIconSvgLight, LinkedinIconSvgLight, TwitterIconSvgLight } from '../SVGs/SVGIcons'

const AuthenticatedNav = () => {
  const currentPath = usePathname()
  const router = useRouter()
  const { data: session } = useSession()

  const handleLogout = async () => {
    try {
      await AuthService.LogoutUser(session?.user?.token as string)
      signOut()
      router.push("/")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Nav className="ms-auto appNavs" navbar>
        <NavItem>
          <NavLink href="/">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/about">About</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/tech-Stack">Tech Stack</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/projects">Projects</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/contact">Contact</NavLink>
        </NavItem>

      </Nav>
      <div className={styles.avi}>
        <div className={styles.avi_profile}>
          <p onClick={() => router.push("/profile")} >Profile</p>
          <p onClick={handleLogout}>Logout</p>
        </div>
      </div>
      {/* <button onClick={handleLogout} className={styles.logout}>Logout</button> */}
      <div className={`${styles.headerSocials} ${styles.mobileHeaderSocials} button`}>
        <GithubIconSvgLight />
        <TwitterIconSvgLight />
        <LinkedinIconSvgLight />
      </div>
    </>
  )
}

export default AuthenticatedNav