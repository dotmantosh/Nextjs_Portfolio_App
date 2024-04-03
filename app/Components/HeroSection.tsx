import React from 'react'
import { Row, Col } from 'reactstrap'
import styles from '../Styles/_hero.module.css'

function HeroSection() {
  return (
    <section className={styles.hero}>
      <Row className='align-items-center'>
        <Col md={6}>
          <h2>
            HI, 🖐✋
            <br />
            My name is
            <br />
            <span>Oyedotun O</span>
            <br />
            I am a Web Developer
          </h2>
        </Col>
        <Col md={6}>
          <div className={styles.heroImgContainer}>

            <div className={styles.heroImg}>

            </div>
          </div>
        </Col>
      </Row>
    </section>
  )
}

export default HeroSection
