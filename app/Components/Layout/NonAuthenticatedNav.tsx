import React from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'
import styles from '../../Styles/_header.module.scss'

const NonAuthenticatedNav = () => {
  return (
    <Nav className="ms-auto appNavs" navbar>
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