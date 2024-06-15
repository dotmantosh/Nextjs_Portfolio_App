'use client'
import { useEffect, useState } from "react";
import HeroSection from "../../Components/HeroSection";
import TechStack from "../../profile/skills/TechStack";
import Projects from "../../profile/project/Projects";
import styles from "../../Styles/_about.module.scss";
// import { useSession } from "next-auth/react"
import { useParams } from "next/navigation"
import WorkExperience from "../../profile/work-experience/WorkExperience";
import Education from "../../profile/education/Education";
import { ProfileService } from "@/app/api/profileService";
import { IProfile } from "@/app/interfaces/IProfile";

export default function Home() {
  // const { data: session, status } = useSession()
  // console.log(session)
  const { username } = useParams()
  const [isFetchingProfile, setIsFetchingProfile] = useState(false)
  const [restricted, setRestricted] = useState(false)
  const [profile, setProfile] = useState<IProfile>()

  const handleFetchProfileByUsername = async () => {
    try {
      setIsFetchingProfile(true)
      const { data } = await ProfileService.FetchProfileByUsername(username as string)
      setProfile(data)
      if (!data || !data.allowPublicUrl) {
        setRestricted(true)
      }
      // console.log(data)
    } catch (error) {
      console.log(error)
      setRestricted(true)
    } finally {
      setIsFetchingProfile(false)
    }
  }
  useEffect(() => {
    if (typeof window !== undefined) {
      handleFetchProfileByUsername()
    }

  }, [typeof window])
  return (
    <main>
      {
        restricted ?
          <div className={styles.restricted}>
            <h2 className="text-center">Page Restricted By User Or No User with the Username {username}.</h2>
            <h2 className="text-center"><a href="/">Go Home</a></h2>
          </div>
          :
          <>
            <HeroSection profile={profile as IProfile} />
            <TechStack />
            <Projects />
            <WorkExperience />
            <Education />
          </>
      }
    </main>
  );
}
