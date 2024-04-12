import React from 'react'
import styles from '../Styles/_techstack.module.css'
import { Col, Row } from 'reactstrap'
import Image from 'next/image'
import HtmlIcon from '../../public/imgs/icons/vscode-icons_file-type-html.png'

function TechStack() {
  return (
    <section className={styles.techStack}>
      <h3 className={`app-heading`}>My Tech Stack</h3>
      <p className='app-subheading'>Technologies I've been working with recently</p>

      <div className={styles.stackContainer}>
        <Row>
          <Col md={2}>
            <div className={styles.stackIconWrapper}>
              <Image src="https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg" fill alt="" className='html' />
              {/* <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg" width="48"
                alt="Javascript" /> */}
              {/* <Image src={HtmlIcon} alt="" className='html'/> */}
            </div>
          </Col>
          <Col md={2}>
            <div className={styles.stackIconWrapper}>
              <Image src={HtmlIcon} alt="" className='html' />
            </div>
          </Col>
          <Col md={2}>
            <div className={styles.stackIconWrapper}>
              <Image src={HtmlIcon} alt="" className='html' />
            </div>
          </Col>
          <Col md={2}>
            <div className={styles.stackIconWrapper}>
              <Image src={HtmlIcon} alt="" className='html' />
            </div>
          </Col>
          <Col md={2}>
            <div className={styles.stackIconWrapper}>
              <Image src={HtmlIcon} alt="" className='html' />
            </div>
          </Col>
          <Col md={2}>
            <div className={styles.stackIconWrapper}>
              <Image src={HtmlIcon} alt="" className='html' />
            </div>
          </Col>
          <Col md={2}>
            <div className={styles.stackIconWrapper}>
              <Image src={HtmlIcon} alt="" className='html' />
            </div>
          </Col>
          <Col md={2}>
            <div className={styles.stackIconWrapper}>
              <Image src={HtmlIcon} alt="" className='html' />
            </div>
          </Col>
          <Col md={2}>
            <div className={styles.stackIconWrapper}>
              <Image src={HtmlIcon} alt="" className='html' />
            </div>
          </Col>
          <Col md={2}>
            <div className={styles.stackIconWrapper}>
              <Image src={HtmlIcon} alt="" className='html' />
            </div>
          </Col>
          <Col md={2}>
            <div className={styles.stackIconWrapper}>
              <Image src={HtmlIcon} alt="" className='html' />
            </div>
          </Col>
          <Col md={2}>
            <div className={styles.stackIconWrapper}>
              <Image src={HtmlIcon} alt="" className='html' />
            </div>
          </Col>
        </Row>
      </div>
    </section>
  )
}

export default TechStack
