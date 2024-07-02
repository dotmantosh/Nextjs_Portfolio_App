'use client'
import React, { Dispatch, SetStateAction } from 'react'
import styles from '../../Styles/_projects.module.scss'
import Image from 'next/image'
import Project1 from '../../../public/imgs/card/project1.png'
import { LinkIconLight, GithubIconSvgLight, EditIcon, DeleteIcon } from '../SVGs/SVGIcons'
import { IProject } from '@/app/interfaces/IProject'
import { useRouter, usePathname } from 'next/navigation'

interface projectCardProps {
    onDeleteIconClicked: (project: IProject) => void
    onEditIconClicked: (project: IProject) => void
    project: IProject

}

function ProjectCard({ onDeleteIconClicked, onEditIconClicked, project }: projectCardProps) {
    const router = useRouter()
    const pathname = usePathname()
    const handleEditClick = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        event.stopPropagation();
        onEditIconClicked(project);
    };

    const handleDeleteClick = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        event.stopPropagation();
        onDeleteIconClicked(project);
    };
    return (
        <div onClick={() => { router.push(`/project/preview/${project._id}`) }} className={styles.projectCard}>
            {
                pathname.startsWith("/profile") &&
                <div className={styles.overlay_actions}>
                    <EditIcon onClickWithEvent={handleEditClick} />
                    <DeleteIcon onClickWithEvent={handleDeleteClick} />
                </div>
            }
            <div className={styles.projectCardImgContainer}>
                <Image src={project.imageUrl as string} fill alt="project" />
            </div>
            <div className={styles.projectDetails}>
                <h4 className={styles.projectTitle}>{project.name}</h4>
                <p dangerouslySetInnerHTML={{ __html: project.description.toString() }} className={styles.projectDesc}></p>
                {
                    (project.populatedSkills && project.populatedSkills.length > 0) &&
                    <p className={styles.projectTechStack}>
                        Tech Stack: &nbsp;
                        {
                            project.populatedSkills.slice(0, 5).map((skill, index) => (
                                <span key={index}>{skill.name}{index < 4 && ', '}</span>
                            ))
                        }
                        {project.populatedSkills.length > 5 && '...'}
                    </p>
                }

                <div className={styles.projectActions}>
                    {
                        project.livePreviewLink &&
                        <div className={styles.projectLiveReview}>
                            <LinkIconLight />
                            <p className='mb-0'>Live Preview</p>
                        </div>
                    }

                    {
                        project.githubRepo &&
                        <div className={styles.projectViewCode}>
                            <GithubIconSvgLight />
                            <p className='mb-0'>View Code</p>
                        </div>
                    }

                </div>
            </div>

        </div>
    )
}

export default ProjectCard
