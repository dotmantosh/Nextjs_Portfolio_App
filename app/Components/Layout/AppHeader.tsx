"use client"
import React, { useState } from 'react';
import { Drawer, Menu, Anchor } from 'antd';
import { MenuOutlined } from "@ant-design/icons"
import styles from '../../Styles/_header.module.css'
import { GithubIconSvgLight, LinkedinIconSvgLight, TwitterIconSvgLight } from '../SVGs/SVGIcons';

const { Link } = Anchor

function AppMenu({ isInline = false }) {
  const MenuStyle = {

    color: "#666666",
    fontSize: 14,
    border: 'none',
    // flexGrow: 1
  }
  const headerItem = [
    { label: "Home", key: "home" },
    { label: "About", key: "about" },
    { label: "Tech Stack", key: "tech-stack" },
    { label: "Projects", key: "projects" },
    { label: "Contact", key: "contact" },
  ]
  return (
    <Menu
      style={MenuStyle}
      mode={isInline ? "inline" : "horizontal"}
      items={headerItem}
    // inlineIndent={50}
    ></Menu>
  )
}

function AppHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false)
  return (
    <>
      {/* <header className={styles.appHeader}>
        <div className={`container ${styles.appHeaderContent}`}>
          <div className={styles.appLogo}>{'{{MPW}}'}</div>
          <span className={styles.menuIcon}>
            <MenuOutlined
            style={{ fontSize: 30 }}
            onClick={toggleMenu}
          />
          </span>
          
          <div className={styles.headerMenu}>
            <div>

            <AppMenu />
            </div>
            <div className={styles.headerSocials}>
              <GithubIconSvg />
              <TwitterIconSvg />
              <LinkedinIconSvg />
            </div>
          </div>
        </div>
        <Drawer
          open={isOpen}
          onClose={closeMenu}
          closable={false}
          style={{ backgroundColor: "darkorange" }}
        >
          <AppMenu isInline />
          <GithubIconSvg />
          <TwitterIconSvg />
          <LinkedinIconSvg />
        </Drawer>
      </header> */}
      <div className="container">
        <div className={styles.header}>
          <div className={styles.logo}>{`{{ MPW }}`}</div>
          <div className={styles.appMenu}>
            <span className={styles.appMenuAnchor}>
              <Anchor direction='horizontal' style={{
                color: "#a7a7a7",
                fontSize: 25,
                border: 'none',
                gap: 40
              }}>
                <Link href='/' title={"Home"} />
                <Link href='/about' title={"About"} />
                <Link href='/tech-stack' title={"Tech Stack"} />
                <Link href='/projects' title={"Projects"} />
                <Link href='/contact' title={"Contact"} />
              </Anchor>
            </span>

            <div className={styles.headerSocials}>
              <GithubIconSvgLight />
              <TwitterIconSvgLight />
              <LinkedinIconSvgLight />
            </div>
          </div>

          {/* Small screen Menu*/}
          <div className={styles.appMenuMobile}>
            <span className={styles.menuIcon}>
              <MenuOutlined
                style={{ fontSize: 30 }}
                onClick={toggleMenu}
              />
            </span>
            <Drawer
              open={isOpen}
              onClose={closeMenu}
              closable={false}
              // style={{ backgroundColor: "darkorange" }}
            >
              <Anchor direction='vertical' style={{
                color: "#666666",
                fontSize: 14,
                border: 'none',
                
              }}>
                <Link href='/' title={"Home"} className={styles.drawerLink}/>
                <Link href='/about' title={"About"} className={styles.drawerLink} />
                <Link href='/tech-stack' title={"Tech Stack"} className={styles.drawerLink} />
                <Link href='/projects' title={"Projects"} className={styles.drawerLink}/>
                <Link href='/contact' title={"Contact"} className={styles.drawerLink}/>
              </Anchor>

              <div className={`${styles.headerSocials} ${styles.mobileHeaderSocials}`}>
                <GithubIconSvgLight />
                <TwitterIconSvgLight />
                <LinkedinIconSvgLight />
              </div>
            </Drawer>
          </div>
        </div>
      </div>

    </>
  );
}

export default AppHeader
