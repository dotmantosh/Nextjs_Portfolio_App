'use client'
import React, { useEffect, useRef, useState } from 'react'
import { DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink, UncontrolledDropdown } from 'reactstrap'
import styles from '../../Styles/_header.module.scss'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { AuthService } from '@/app/api/authService'
import { signOut, useSession } from 'next-auth/react'
import { DropdownSmallIcon, GithubIconSvgLight, LinkedinIconSvgLight, TwitterIconSvgLight } from '../SVGs/SVGIcons'
import Image from 'next/image'
import useOuterClick from '@/app/hooks/useOuterClick'
import { DropDownArrow } from '@/public/imgs/images'
import { type } from 'os'

const AuthenticatedNav = () => {
  const [isNavOptionsOpen, setIsNavOptionsOpen] = useState(false)
  const [hostname, setHostname] = useState("")
  const router = useRouter()
  const { data: session } = useSession()
  const navRef = useRef(null)
  const pathname = usePathname()
  const { username } = useParams()

  // console.log(session)
  const showNavArr = ["/"]

  const toggleNav = () => { setIsNavOptionsOpen(!isNavOptionsOpen) }

  const handleLogout = async () => {
    try {
      await AuthService.LogoutUser(session?.user?.token as string)
      signOut()
      router.push("/")
    } catch (error) {
      console.log(error)
    }
  }

  useOuterClick(navRef, setIsNavOptionsOpen)

  const scrollToTopOfSection = (sectionId: string) => {
    const section = document.querySelector(`#${sectionId}`);
    if (section) {
      // Scroll to the top of the section
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      setHostname(window.location.origin);
      console.log(session)
    }
  }, [typeof window, session])

  useEffect(() => {
    if (typeof window !== undefined) {
      const params = new URLSearchParams(window.location.search);
      const section = params.get('section');
      if (section) {
        const sectionElement = document.getElementById(section);
        if (sectionElement) {
          sectionElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  }, [typeof window]);
  return (
    <>
      <Nav className="ms-auto appNavs" navbar>
        {
          !pathname.startsWith("/public") && showNavArr.includes(pathname) &&
          <div className={styles.home_header}>
            <NavItem>
              <NavLink onClick={() => { scrollToTopOfSection("home") }}>Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => { scrollToTopOfSection("about") }}>About Us</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => { scrollToTopOfSection("contact") }}>Contact Us</NavLink>
            </NavItem>
          </div>
        }
        {
          pathname.startsWith('/public') &&
          <UncontrolledDropdown nav inNavbar className='d-flex align-items-center'>
            <DropdownToggle nav caret>
              Portfolio
            </DropdownToggle>
            <DropdownMenu className={styles.navDropdown} >
              <DropdownItem className={`pt-2 ${styles.dropdown_item}`} onClick={() => { scrollToTopOfSection("about-me") }}>About Me</DropdownItem>
              <DropdownItem className={styles.dropdown_item} onClick={() => { scrollToTopOfSection("tech-stack") }}>My Skills</DropdownItem>
              <DropdownItem className={styles.dropdown_item} onClick={() => { scrollToTopOfSection("projects") }}>Projects</DropdownItem>
              <DropdownItem className={styles.dropdown_item} onClick={() => { scrollToTopOfSection("workExperience") }}>Work Experience</DropdownItem>
              <DropdownItem className={`pb-2 ${styles.dropdown_item}`} onClick={() => { scrollToTopOfSection("education") }} >Education</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        }
        {
          session ?
            (
              <div ref={navRef} onClick={toggleNav} className={styles.avi}>
                {session?.user.imageUrl ?
                  <Image src={session?.user.imageUrl as string} alt='dp' fill /> :
                  "N/A"
                }

                <div className={styles.dropdown_img}>
                  {/* <Image src={DropDownArrow} alt='arr' /> */}
                  <DropdownSmallIcon />
                </div>
                {
                  isNavOptionsOpen &&
                  <div className={styles.avi__profile}>
                    <p className={styles.avi_item_profile} onClick={() => router.push(`/profile/skills`)} >Profile</p>
                    <p className={styles.avi_item_logout} onClick={handleLogout}>Logout</p>
                  </div>
                }
              </div>
            ) :
            (
              <>
                <NavItem>
                  <NavLink className='ms-3' href="/login">Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/signup" className={styles.signup}>SignUp</NavLink>
                </NavItem>
              </>
            )
        }
      </Nav>
      {/* <button onClick={handleLogout} className={styles.logout}>Logout</button> */}
      {/* <div className={`${styles.headerSocials} ${styles.mobileHeaderSocials} button`}>
        <GithubIconSvgLight />
        <TwitterIconSvgLight />
        <LinkedinIconSvgLight />
      </div> */}
    </>
  )
}

export default AuthenticatedNav