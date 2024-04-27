'use client'
import HeroSection from "../Components/HeroSection";
import TechStack from "../Components/TechStack";
import Projects from "../Components/Projects";
// import styles from "../../page.module.scss";
import { useSession } from "next-auth/react"

export default function Home() {
  const { data: session, status } = useSession()
  // console.log(session)
  return (
    <main>
      <HeroSection />
      <TechStack />
      <Projects />
    </main>
  );
}
