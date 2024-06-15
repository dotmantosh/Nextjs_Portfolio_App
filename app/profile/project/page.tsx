'use client'
import React, { useState, Dispatch, SetStateAction } from 'react'
import styles from "../../Styles/_profile.module.scss"
import Sidebar from '../Sidebar'
import Project from '@/app/profile/project/Projects'
// import useResponsiveness from '@/app/hooks/useResponsiveness'


const page = () => {
  const [activeNav, setActiveNav] = useState("Education")
  return (
    <div className={styles.profile}>
      <div className={styles.profile_wrapper}>
        <Sidebar />

        <Project />
      </div>
    </div>
  )
}

export default page