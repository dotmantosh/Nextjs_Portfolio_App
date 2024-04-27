'use client'
import React from 'react'
import styles from '../Styles/_profile.module.scss'
import TechStack from '../Components/TechStack'
import Projects from '../Components/Projects'
import WorkExperience from '../Components/WorkExperience'
import Education from '../Components/Education'
import Account from '../Components/Account'

interface ProfileProps {
  // setActiveNav: Dispatch<SetStateAction<string>>
  activeNav: string
}
const Profile = ({ activeNav }: ProfileProps) => {
  const getActiveTab = (activeNav: string) => {
    switch (activeNav) {
      case "skills":
        return <TechStack />
      case "projects":
        return <Projects />
      case "experience":
        return <WorkExperience />
      case "education":
        return <Education />
      case "account":
        return <Account />
      default:
        return <></>;
    }
  }
  return (
    <div className={styles.profile}>
      <div className={styles.profile_wrapper}>
        {getActiveTab(activeNav)}
      </div>
    </div>
  )
}

export default Profile