'use client'
import React, { useState, Dispatch, SetStateAction, useEffect } from 'react'
import styles from '../Styles/_profile.module.scss'
import { usePathname, useRouter } from 'next/navigation'
import { Collapse, NavbarToggler } from 'reactstrap'
import { HambugerMenuIcon } from '../Components/SVGs/SVGIcons'
import Link from 'next/link'
import { AuthService } from '../api/authService'
import { useSession, signOut } from 'next-auth/react'


const Sidebar = () => {
  // const [pathname, setPathName] = useState()
  const [navBarOpen, setNavBarOpen] = useState(false)

  const router = useRouter()
  const activeNav = usePathname()
  const { data: session } = useSession()

  // console.log(activeNav)
  const toggleNavbar = () => {
    // console.log(navBarOpen)
    setNavBarOpen(!navBarOpen)
  }

  const handleLogout = async () => {
    try {
      // console.log('signOut clicked')
      if (!session) {
        return router.push("/")
      }
      await AuthService.LogoutUser(session?.user?.token as string)
      await signOut({ redirect: false })
      router.push("/")
    } catch (error) {
      router.push("/")
      console.log(error)
    }
  }

  return (
    <>
      <div className={styles.sidebar_mobile}>
        <nav className={styles.sidebar_mobile_nav}>
          <HambugerMenuIcon onClick={toggleNavbar} />
          <Collapse isOpen={navBarOpen} className={styles.sidebar_collapse}>
            <div className={styles.sidebar_nav}>
              <ul>
                <li
                  onClick={() => { router.push('/profile/skills') }}
                  className={activeNav === '/profile/skills' ? styles.active : ''}>
                  Skills
                </li>
                <li
                  onClick={() => { router.push('/profile/project') }}
                  className={activeNav === '/profile/project' ? styles.active : ''}>
                  Projects
                </li>
                <li
                  onClick={() => { router.push('/profile/work-experience') }}
                  className={activeNav === '/profile/work-experience' ? styles.active : ''}>
                  Work Experience
                </li>
                <li
                  onClick={() => { router.push('/profile/education') }}
                  className={activeNav === '/profile/education' ? styles.active : ''}>
                  Education
                </li>
                <li
                  onClick={() => { router.push('/profile/account') }}
                  className={activeNav === '/profile/account' ? styles.active : ''}>
                  Account
                </li>
                <li
                  onClick={() => { handleLogout() }}
                  className={activeNav === '/profile/logout' ? styles.active : ''}>
                  Logout
                </li>
              </ul>
            </div>
          </Collapse>
        </nav>
      </div>
      <div className={styles.sidebar}>
        <div className={styles.sidebar_logo}>
          <Link href={"/"}>MPW</Link>

        </div>

        <div className={styles.sidebar_nav}>
          <ul>
            <li
              onClick={() => { router.push('/profile/skills') }}
              className={activeNav === '/profile/skills' ? styles.active : ''}>
              Skills
            </li>
            <li
              onClick={() => { router.push('/profile/project') }}
              className={activeNav === '/profile/project' ? styles.active : ''}>
              Projects
            </li>
            <li
              onClick={() => { router.push('/profile/work-experience') }}
              className={activeNav === '/profile/work-experience' ? styles.active : ''}>
              Work Experience
            </li>
            <li
              onClick={() => { router.push('/profile/education') }}
              className={activeNav === '/profile/education' ? styles.active : ''}>
              Education
            </li>
            <li
              onClick={() => { router.push('/profile/account') }}
              className={activeNav === '/profile/account' ? styles.active : ''}>
              Account
            </li>
            <li
              onClick={() => { handleLogout() }}
              className={activeNav === '/profile/logout' ? styles.active : ''}>
              Logout
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Sidebar