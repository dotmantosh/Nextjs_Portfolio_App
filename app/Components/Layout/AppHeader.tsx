"use client"
import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Container,
} from 'reactstrap';

import styles from '../../Styles/_header.module.css'
import { GithubIconSvgLight, LinkedinIconSvgLight, TwitterIconSvgLight } from '../SVGs/SVGIcons';


function AppHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false)
  return (
    <>
      <div>
        <Navbar expand={'md'} className={styles.appNavbar}>
          <NavbarBrand href="/" className={styles.logo}>{'{{ M P W }}'}</NavbarBrand>
          <NavbarToggler onClick={toggleMenu} className={styles.customToggler}/>
          <Collapse isOpen={isOpen} navbar>
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
            <div className={`${styles.headerSocials} ${styles.mobileHeaderSocials} button`}>
              <GithubIconSvgLight />
              <TwitterIconSvgLight />
              <LinkedinIconSvgLight />
            </div>
          </Collapse>
        </Navbar>
      </div>
    </>
  );
}

export default AppHeader
