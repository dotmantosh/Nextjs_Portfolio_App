'use client'
import React, { useEffect, useState } from 'react'
import styles from '../../../Styles/_projects.module.scss'
import { IProject } from '@/app/interfaces/IProject'
import Image from 'next/image'
import { Col, Row } from 'reactstrap'
import { GithubIconSvgLight, LinkIconLight } from '@/app/Components/SVGs/SVGIcons'
import { useParams } from 'next/navigation'
import { ProfileService } from '@/app/api/profileService'
import { toast } from 'sonner'

interface pageProp {
  project: IProject
}
const page = () => {
  const [project, setProject] = useState<IProject>()
  const [isFetchingProfile, setIsFetchingProfile] = useState(false)
  const { id } = useParams()
  const fetchProfile = async () => {
    try {
      setIsFetchingProfile(true)
      const response = await ProfileService.FetchProjectById(id as string)
      // Put skills into a new object called populatedSkills to be used on UI
      response.data.populatedSkills = response.data.skills
      setProject(response.data)
    } catch (error) {
      toast.error("Could not fetch Project. Try again")
      console.log(error)
    } finally {
      setIsFetchingProfile(false)
    }
  }

  useEffect(() => {
    // console.log(id)
    id && fetchProfile()
  }, [id])
  return (
    <>
      {
        project &&
        <section className={styles.project_preview}>
          <div className={styles.project_preview_container}>
            <div className={styles.project_preview_img}>
              <Image src={project.imageUrl as string} alt='img' fill />
            </div>

            <div className={styles.project_preview_body}>

              <Row>
                <Col md={9}>
                  <h2>{project.name}</h2>
                  {
                    (project?.skills?.length > 0) &&
                    <div className={styles.project_preview_skills}>
                      <h3 className='mb-0'>Skills Used :</h3>
                      {
                        project.populatedSkills?.map((skill, index) => (
                          <div key={index} className={styles.project_preview_skills_item}>{skill.name}</div>
                        ))
                      }
                    </div>
                  }
                  <div className={styles.project_preview_description} dangerouslySetInnerHTML={{ __html: project.description.toString() }}>
                  </div>
                </Col>
                <Col md={3}>
                  <div className={styles.project_preview_links}>
                    <h2 className='text-center'>Links</h2>
                    {!project.githubRepo && !project.livePreviewLink &&
                      <p className='text-center'>No Links Found</p>
                    }
                    {project.githubRepo &&
                      <div className={styles.project_preview_link}>
                        <a href={project.githubRepo} target='_blank'><GithubIconSvgLight /> Github </a>
                      </div>
                    }
                    {
                      project.livePreviewLink &&
                      <div className={styles.project_preview_link}>
                        <a href={project.livePreviewLink} target='_blank'><LinkIconLight /> Live Link</a>
                      </div>
                    }
                  </div>
                </Col>
              </Row>

            </div>
          </div>
        </section>
      }
    </>
  )
}

export default page