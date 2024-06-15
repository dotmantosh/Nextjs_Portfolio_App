'use client'
import HeroSection from "./Components/HeroSection";
import TechStack from "./profile/skills/TechStack";
import Projects from "./profile/project/Projects";
// import styles from "./page.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LandingPage from "./LandingPage";
import { useSession } from "next-auth/react";



export default function Home() {
  const [isLanding, setIsLanding] = useState(true)

  const router = useRouter()
  const { data: session } = useSession()


  return (
    <main >
      <LandingPage />
    </main>
  );
}
