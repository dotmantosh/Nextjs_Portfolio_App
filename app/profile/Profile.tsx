'use client'
import React, { useEffect, useState } from 'react'
import styles from '../Styles/_profile.module.scss'
import TechStack from '../Components/TechStack'
import Projects from '../Components/Projects'
import WorkExperience from '../Components/WorkExperience'
import Education from '../Components/Education'
import Account from '../Components/Account'
import { ISkill } from '../interfaces/ISkill'
import { ProfileService } from '../api/profileService'
import { toast } from 'sonner'

interface ProfileProps {
  // setActiveNav: Dispatch<SetStateAction<string>>
  activeNav: string
}
const Profile = ({ activeNav }: ProfileProps) => {
  const [isFetchingSkills, setIsFetchingSkills] = useState(false)
  const [skills, setSkills] = useState<ISkill[]>()

  const handleFetchSkills = async () => {
    try {
      setIsFetchingSkills(true)
      const { data } = await ProfileService.FetchSkills()
      console.log(data)
      setSkills(data)
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong fetching Skills. Try again!")
    } finally {
      setIsFetchingSkills(false)
    }
  }

  useEffect(() => {
    handleFetchSkills()
  }, [])
  const getActiveTab = (activeNav: string) => {
    switch (activeNav) {
      case "skills":
        return <TechStack skills={skills} isFetchingSkills={isFetchingSkills} />
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