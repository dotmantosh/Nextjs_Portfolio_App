'use client'
import React, { useState, Dispatch, SetStateAction } from 'react'
import styles from "../Styles/_profile.module.scss"
import Sidebar from './Sidebar'
import Profile from './Profile'


const page = () => {
  const [activeNav, setActiveNav] = useState("skills")
  return (
    <div>
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />
      <Profile activeNav={activeNav} />
    </div>
  )
}

export default page