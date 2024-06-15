'use client'
import React, { useState, Dispatch, SetStateAction } from 'react'
import styles from "../../Styles/_profile.module.scss"
import Sidebar from '../Sidebar'
import EducationPage from '@/app/profile/education/Education'


const page = () => {
  const [activeNav, setActiveNav] = useState("Education")
  return (
    <div className={styles.profile}>
      <div className={styles.profile_wrapper}>
        <Sidebar />

        <EducationPage />
      </div>
    </div>
  )
}

export default page