'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Row, Col, Spinner } from 'reactstrap'
import styles from '../Styles/_hero.module.scss'
import { ProfileService } from '../api/profileService'
import { useParams } from 'next/navigation'
import { IProfile } from '../interfaces/IProfile'
import Image from 'next/image'
import { DiscordIconSvgLight, DownloadIcon, GithubIconSvgLight, LinkedinIconSvgLight, TwitterIconSvgLight } from './SVGs/SVGIcons'
import { toast } from 'sonner'

interface Prop {
  profile: IProfile
}
function HeroSection({ profile }: Prop) {

  const [isDownloadingResume, setIsDownloadingResume] = useState(false)

  const sectionRef = useRef(null)
  const { username } = useParams()


  const handleDownloadResume = async () => {
    const resumeUrl = profile?.resumeUrl;
    if (isDownloadingResume) return
    if (resumeUrl) {
      try {
        setIsDownloadingResume(true)
        const response = await fetch(resumeUrl, {
          mode: 'cors',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.setAttribute('download', username + '_resume.pdf');
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        window.URL.revokeObjectURL(url);
        toast.success("Resume Downloaded Successfully")
        setIsDownloadingResume(false)
      } catch (error) {
        toast.error("Something went wrong, could not download Resume.")
        setIsDownloadingResume(false)
        console.error('Error downloading the file:', error);
      }
    }
  };

  return (
    <>
      <section ref={sectionRef} className={styles.hero}>
        {profile &&
          <Row className='align-items-center'>
            <Col md={7}>
              <h2>
                HI, 🖐✋
                <br />
                My name is
                <br />
                <span>{profile?.firstName} {profile?.lastName}.</span>
                <br />
                I am a Software Developer
              </h2>
              <div className={styles.hero_buttons}>
                <div className={styles.hero_social}>
                  {
                    profile.github &&
                    <a href={profile.github} target='_blank' rel="noreferrer" >
                      <GithubIconSvgLight />
                    </a>
                  }
                  {
                    profile.linkedIn &&
                    <a href={profile.linkedIn} target='_blank' rel="noreferrer">
                      <LinkedinIconSvgLight />
                    </a>
                  }
                  {
                    profile.twitter &&
                    <a href={profile.twitter} target='_blank' rel="noreferrer">
                      <TwitterIconSvgLight />
                    </a>
                  }
                  {
                    profile.discord &&
                    <a href={profile.discord} target='_blank' rel="noreferrer">
                      <DiscordIconSvgLight />
                    </a>
                  }
                </div>

                {
                  profile.allowResumeDownload && profile.resumeUrl && !isDownloadingResume &&
                  <p className='mb-0' onClick={handleDownloadResume}><DownloadIcon /> Download My Resume (.pdf) {isDownloadingResume && <Spinner>Loading...</Spinner>}</p>
                }

              </div>
            </Col>
            <Col md={5}>
              <div className={styles.heroImgContainer}>

                <div className={styles.heroImg}>
                  <Image src={profile?.imageUrl as string} alt="user-img" fill />
                </div>
              </div>
            </Col>
          </Row>
        }
      </section>
      {
        profile?.about &&
        <section id='about-me' className={styles.about}>
          <h3 className='app-heading'>A little About Me</h3>
          <p className='text-center mt-4'>{profile?.about}</p>
        </section>
      }
    </>
  )
}

export default HeroSection
