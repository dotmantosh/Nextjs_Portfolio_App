'use client'
import React, { useState, Dispatch, SetStateAction } from 'react'
import styles from "../../Styles/_profile.module.scss"
import Sidebar from '../Sidebar'
import Account from './Account'


const page = () => {
  return (
    <div className={styles.profile}>
      <div className={styles.profile_wrapper}>
        <Sidebar />

        <Account />
      </div>
    </div>
  )
}

export default page