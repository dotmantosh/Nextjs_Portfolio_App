'use client'
import React, { useState, Dispatch, SetStateAction } from 'react'
import styles from '../Styles/_profile.module.scss'

interface SidebarProps {
  setActiveNav: Dispatch<SetStateAction<string>>
  activeNav: string
}
const Sidebar = ({ activeNav, setActiveNav }: SidebarProps) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar_logo}>
        MPW
      </div>

      <div className={styles.sidebar_nav}>
        <ul>
          <li
            onClick={() => setActiveNav('skills')}
            className={activeNav === 'skills' ? styles.active : ''}>
            Skills
          </li>
          <li
            onClick={() => setActiveNav('projects')}
            className={activeNav === 'projects' ? styles.active : ''}>
            Projects
          </li>
          <li
            onClick={() => setActiveNav('experience')}
            className={activeNav === 'experience' ? styles.active : ''}>
            Work Experience
          </li>
          <li
            onClick={() => setActiveNav('education')}
            className={activeNav === 'education' ? styles.active : ''}>
            Education
          </li>
          <li
            onClick={() => setActiveNav('account')}
            className={activeNav === 'account' ? styles.active : ''}>
            Account
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar