'use client'
import HeroSection from "./Components/HeroSection";
import TechStack from "./Components/TechStack";
import Projects from "./Components/Projects";
// import styles from "./page.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LandingPage from "./LandingPage";
import { useSession } from "next-auth/react";



export default function Home() {
  const [isLanding, setIsLanding] = useState(true)

  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    router && console.log(session)
    if (!isLanding) {
      router.push('/profile/dotmantosh')
    }
  }, [router])
  return (
    <main >
      <LandingPage />
    </main>
  );
}
