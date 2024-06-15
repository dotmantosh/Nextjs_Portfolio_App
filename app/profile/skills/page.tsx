'use client'
import React, { useState, Dispatch, SetStateAction } from 'react'
import styles from "../../Styles/_profile.module.scss"
import Sidebar from '../Sidebar'
import TechStack from '@/app/profile/skills/TechStack'


const page = () => {

  return (
    <div className={styles.profile}>
      <div className={styles.profile_wrapper}>
        <Sidebar />

        <TechStack />
      </div>
    </div>
  )
}

export default page