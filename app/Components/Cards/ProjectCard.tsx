import React from 'react'
import styles from '../../Styles/_projects.module.scss'
import Image from 'next/image'
import Project1 from '../../../public/imgs/card/project1.png'
import { LinkIconLight, GithubIconSvgLight, EditIcon, DeleteIcon } from '../SVGs/SVGIcons'

function ProjectCard() {
    return (
        <div className={styles.projectCard}>
            <div className={styles.overlay_actions}>
                <EditIcon onClick={() => { }} />
                <DeleteIcon onClick={() => { }} />
            </div>
            <div className={styles.projectCardImgContainer}>
                <Image src={Project1} alt="project" />
            </div>
            <div className={styles.projectDetails}>
                <h4 className={styles.projectTitle}>Project Title Goes Here</h4>
                <p className={styles.projectDesc}>This is sample project description random things are here in description This is sample project lorem ipsum generator for dummy content</p>

                <p className={styles.projectTechStack}>
                    Tech Stack:
                    <span>Html, </span>
                    <span>JavaScript, </span>
                    <span>Sass, </span>
                    <span>React </span>
                </p>

                <div className={styles.projectActions}>
                    <div className={styles.projectLiveReview}>
                        <LinkIconLight />
                        <p className='mb-0'>Live Preview</p>
                    </div>
                    <div className={styles.projectViewCode}>
                        <GithubIconSvgLight />
                        <p className='mb-0'>View Code</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProjectCard
