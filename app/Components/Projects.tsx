import React from 'react'
import styles from '../Styles/_projects.module.css'
import { Col, Row } from 'reactstrap'
import ProjectCard from './Cards/ProjectCard'
function Projects() {
  return (
    <section className={styles.projects}>
      <h3 className={`app-heading`}>My Projects</h3>
      <p className='app-subheading'>Things I've built so far</p>

      <div className={styles.projectsWrapper}>
        <Row>
          <Col md={4} className={styles.projectCol}>
            <ProjectCard/>
          </Col>
          <Col md={4} className={styles.projectCol}>
            <ProjectCard/>
          </Col>
          <Col md={4} className={styles.projectCol}>
            <ProjectCard/>
          </Col>
          <Col md={4} className={styles.projectCol}>
            <ProjectCard/>
          </Col>
          <Col md={4} className={styles.projectCol}>
            <ProjectCard/>
          </Col>
          <Col md={4} className={styles.projectCol}>
            <ProjectCard/>
          </Col>
          
        </Row>
      </div>
    </section>
  )
}

export default Projects
