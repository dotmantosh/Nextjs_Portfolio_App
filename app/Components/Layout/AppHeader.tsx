"use client"
import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand
} from 'reactstrap';

import styles from '../../Styles/_header.module.scss'
import { GithubIconSvgLight, LinkedinIconSvgLight, TwitterIconSvgLight } from '../SVGs/SVGIcons';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { AuthService } from '@/app/api/authService';
import { signOut } from 'next-auth/react'
import Link from 'next/link';
import NonAuthenticatedNav from './NonAuthenticatedNav';
import AuthenticatedNav from './AuthenticatedNav';
// import Link from 'next/navigation'


function AppHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false)
  const currentPath = usePathname()
  const router = useRouter()

  const NoAuth = ["/", "/signup", "/login"]
  const { data: session } = useSession()

  return (
    <>
      <div className={`container ${styles.app_header}`}>
        <Navbar expand={'md'} className={styles.appNavbar}>
          <NavbarBrand href="/" className={styles.logo}>{'<Devsfolios/>'}</NavbarBrand>
          <NavbarToggler onClick={toggleMenu} className={styles.customToggler} />
          <Collapse isOpen={isOpen} navbar>
            {
              // !session ?
              //   <NonAuthenticatedNav />
              //   :
              <AuthenticatedNav />
            }
          </Collapse>
        </Navbar>
      </div>
    </>
  );
}

export default AppHeader
