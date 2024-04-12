'use client'
import HeroSection from "../../Components/HeroSection";
import TechStack from "../../Components/TechStack";
import Projects from "../../Components/Projects";
import styles from "../../page.module.css";
import { useSession } from "next-auth/react"

export default function Home() {
  const { data: session, status } = useSession()
  console.log(session)
  return (
    <main className={styles.main}>
      <HeroSection />
      <TechStack />
      <Projects />
    </main>
  );
}
