import React from 'react'
import styles from '../../Styles/_footer.module.css'
import { GithubIconSvgLight, LinkedinIconSvgLight, TwitterIconSvgLight } from '../SVGs/SVGIcons'

function AppFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.logo}>
          {`{{ M P W }}`}
        </div>

        <div className={styles.footerTopRight}>
          <p className='mb-0'>0808080808</p>
          <p className='mb-0'>info@example.com</p>

          <div className={styles.footerSocials}>
            <GithubIconSvgLight />
            <TwitterIconSvgLight />
            <LinkedinIconSvgLight />
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <ul className={styles.footerNav}>
          <li>Home</li>
          <li>About</li>
          <li>Tech Stack</li>
          <li>Projects</li>
          <li>Contact</li>
        </ul>
      </div>
    </footer>
  )
}

export default AppFooter
