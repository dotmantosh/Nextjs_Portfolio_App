import HeroSection from "./Components/HeroSection";
import TechStack from "./Components/TechStack";
import Projects from "./Components/Projects";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <HeroSection/>
      <TechStack/>
      <Projects/>
    </main>
  );
}
