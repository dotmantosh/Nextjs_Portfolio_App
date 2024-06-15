'use client'
import React from 'react'
import { DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink, UncontrolledDropdown } from 'reactstrap'
import styles from '../../Styles/_header.module.scss'
import { useParams, usePathname } from 'next/navigation'

const NonAuthenticatedNav = () => {
  const pathname = usePathname()
  const username = useParams()
  return (
    <Nav className="ms-auto appNavs" navbar>
      {pathname.startsWith('/public') &&
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
            Portfolio
          </DropdownToggle>
          <DropdownMenu className={styles.navDropdown} >
            <DropdownItem className={styles.dropdown_item} href="/">Home</DropdownItem>
            <DropdownItem className={styles.dropdown_item} href={`/about/${username}?section=about`}>About</DropdownItem>
            <DropdownItem className={styles.dropdown_item} href={`/tech-stack/${username}?section=tech-stack`}>Tech Stack</DropdownItem>
            <DropdownItem className={styles.dropdown_item} href="/projects">Projects</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      }
      <NavItem>
        <NavLink href="/login">Login</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/signup" className={styles.signup}>SignUp</NavLink>
      </NavItem>


    </Nav>
  )
}

export default NonAuthenticatedNav