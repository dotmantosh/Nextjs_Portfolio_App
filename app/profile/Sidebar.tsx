'use client'
import React, { useState, Dispatch, SetStateAction } from 'react'
import styles from '../Styles/_profile.module.scss'
import { usePathname, useRouter } from 'next/navigation'
import { Collapse, NavbarToggler } from 'reactstrap'
import { HambugerMenuIcon } from '../Components/SVGs/SVGIcons'
import Link from 'next/link'


const Sidebar = () => {
  // const [pathname, setPathName] = useState()
  const [navBarOpen, setNavBarOpen] = useState(false)
  const router = useRouter()
  const activeNav = usePathname()
  // console.log(activeNav)
  const toggleNavbar = () => {
    console.log(navBarOpen)
    setNavBarOpen(!navBarOpen)
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
          </ul>
        </div>
      </div>
    </>
  )
}

export default Sidebar