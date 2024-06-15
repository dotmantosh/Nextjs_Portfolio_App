'use client'
import React, { useEffect, useRef, useState } from 'react'
import styles from '../../Styles/_techstack.module.scss'
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner } from 'reactstrap'
import Image from 'next/image'
import HtmlIcon from '../../../public/imgs/icons/vscode-icons_file-type-html.png'
import { InputSearchIcon } from '../../Components/SVGs/SVGIcons'
import { ISkill } from '../../interfaces/ISkill'
import { ProfileService } from '../../api/profileService'
import { toast } from 'sonner'
import { usePathname, useParams, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { ITechStack } from '@/app/interfaces/ITechStack'

interface ComponentProps {
  skills?: ISkill[] | undefined
  isFetchingSkills?: boolean
}
function TechStack() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const toggle = () => setIsModalOpen(!isModalOpen)

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { username } = useParams()
  const sectionRef = useRef(null)

  const { data: session } = useSession()

  const closeBtn = (
    <button className="app_modal_close" onClick={toggle} type="button">
      &times;
    </button>
  );
  const [isFetchingSkills, setIsFetchingSkills] = useState(false)
  const [isFetchingTechStack, setIsFetchingTechStack] = useState(false)
  const [isCreatingTechStack, setIsCreatingTechStack] = useState(false)
  const [isDeletingTechStack, setIsDeletingTechStack] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const showMoreCount = 12

  const [skills, setSkills] = useState<ISkill[]>()
  const [techStacks, setTechStacks] = useState<ITechStack[]>([])
  const [techStackToDisplay, setTechStacksToDisplay] = useState<ITechStack[]>()
  const [selectedSkill, setSelectedSkill] = useState<ISkill>()

  const handleFetchSkills = async () => {
    try {
      setIsFetchingSkills(true)
      const { data } = await ProfileService.FetchSkills()
      // console.log(data)
      setSkills(data)
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong fetching Skills. Try again!")
    } finally {
      setIsFetchingSkills(false)
    }
  }

  const handleFetchUserSkills = async () => {
    try {
      setIsFetchingTechStack(true)
      const response = await ProfileService.FetchUserTechStack(session?.user.token as string)
      const data = response.data
      // console.log(response)
      // console.log(data)
      setTechStacks(data)
      setTechStacksToDisplay(data)
    } catch (error) {

    } finally {
      setIsFetchingTechStack(false)
    }

  }
  const handleShowMore = () => {
    if (!showMore) {
      setShowMore(true)
      setTechStacksToDisplay(techStacks)
    } else {
      setShowMore(false)
      setTechStacksToDisplay(techStacks.slice(0, showMoreCount))
    }
  }
  const handleSkillsByUsername = async () => {
    try {
      setIsFetchingTechStack(true)
      const response = await ProfileService.FetchTechStackByUsername(username as string)
      const data = response.data
      // console.log(response)
      // console.log(data)
      setTechStacks(data)
      setTechStacksToDisplay(data.slice(0, showMoreCount))
    } catch (error) {

    } finally {
      setIsFetchingTechStack(false)
    }

  }

  const handleCreateTechStack = async (skill: ISkill) => {
    if (isCreatingTechStack) return
    setSelectedSkill(skill)
    try {
      setIsCreatingTechStack(true)
      await ProfileService.CreateUserTechStack(skill, session?.user.token as string)
      toast.success("Tech Stack updated successfully/")
      handleFetchUserSkills()
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong creating skill. Try again.")
    } finally {
      setIsCreatingTechStack(false)
    }
  }
  const handleDeleteTechStack = async (skill: ISkill) => {
    if (isDeletingTechStack) return;
    try {
      setIsDeletingTechStack(true)
      const techStack = techStacks.find(stack => stack.skillId === skill._id);
      if (techStack) {
        // Delete the tech stack if found
        await ProfileService.DeleteUserTechStack(techStack._id as string, session?.user.token as string);

        // Update the tech stacks state by removing the deleted stack 
        handleFetchUserSkills()
        toast.success("Tech Stack removed successfully");
      } else {
        toast.error("Tech Stack not found");
      }

    } catch (error) {
      console.log(error)
      toast.error("Something went wrong deleting skill. Try again.")
    } finally {
      setIsDeletingTechStack(false)
    }
  }

  const createOrDeleteTechStack = async (skill: ISkill) => {
    if (techStacks && techStacks.some(stack => stack.skillId === skill._id)) {
      await handleDeleteTechStack(skill);
    } else {
      await handleCreateTechStack(skill);
    }
  };


  useEffect(() => {
    if (!pathname.startsWith("/public") && typeof window !== undefined) {
      handleFetchSkills()
      handleFetchUserSkills()
    }
  }, [session])
  useEffect(() => {
    if (typeof window !== undefined && pathname.startsWith('/public')) {
      // console.log('techstack: ', techStacks)
      // handleFetchSkills()
      handleSkillsByUsername()
    }

  }, [typeof window])
  return (
    <section ref={sectionRef} id='tech-stack' className={styles.techStack}>

      <Modal
        contentClassName={'app_modal_content'}
        className={'app_modal'}
        centered isOpen={isModalOpen}
        size='md'
        toggle={toggle}>
        <ModalHeader className={'app_modal_header'} close={closeBtn} toggle={toggle}>Add Skills</ModalHeader>
        <ModalBody className={'app_modal_body'}>
          <div className={`position-relative ${styles.form_group} `}>
            <span className={styles.filterInput}><InputSearchIcon /></span>
            <input style={{ paddingLeft: "50px" }} type="text" placeholder='Filter skills' />
          </div>
          <div className={styles.skills_wrapper}>
            {isFetchingSkills && <div className='d-flex justify-content-center'><Spinner>Loading...</Spinner> </div>}
            {skills && skills.map((skill, index) => (
              <div onClick={() => { createOrDeleteTechStack(skill) }} key={index} className={styles.skills_item}>
                <input type="checkbox" checked={techStacks?.some(stack => stack.skillId === skill._id)} />
                <p className='mb-0 d-flex justify-content-between align-items-center flex-grow-1'>{skill.name} {(isCreatingTechStack || isDeletingTechStack) && selectedSkill?._id === skill._id && <Spinner>Loading...</Spinner>}</p>
              </div>
            ))}
          </div>
        </ModalBody>
        <ModalFooter className={'app_modal_footer'}>
          {/* <button className='app_modal_cancel' onClick={toggle}>
            Cancel
          </button>{' '} */}
          <button className='app_modal_save' onClick={toggle}>
            Okay
          </button>
        </ModalFooter>
      </Modal>

      <h3 className={`app-heading ${pathname === '/profile/skills' && 'text-start'}`}>My Tech Stack</h3>
      <p className={`app-subheading ${pathname === '/profile/skills' && 'text-start'}`}>Technologies I've been working with recently</p>
      {
        pathname.startsWith("/profile") &&
        <button className={styles.addModalbutton} onClick={toggle}>
          + Add Skill
        </button>
      }

      <div className={pathname.startsWith('/profile') ? styles.stackContainer : styles.stackContainerPublic}>
        <Row>
          {
            isFetchingTechStack && !techStackToDisplay?.length &&
            <div className='d-flex justify-content-center'>
              <Spinner style={{ width: "3rem", height: "3rem" }}>Loading...</Spinner>
            </div>
          }
          {
            techStackToDisplay &&
            techStackToDisplay.map((techStack, index) => (
              <Col key={index} md={2} sm={4} xs={6}>
                <div className={styles.stackIconWrapper}>
                  <p className={`text-center text-capitalize ${styles.stackIconName}`}>{techStack.populatedSkill?.name}</p>
                  <div className={styles.stackIconImgWrapper}>

                    <Image src={techStack.populatedSkill?.imageUrl as string} fill alt="" className='html' />
                  </div>

                </div>
              </Col>
            ))
          }
          {
            !isFetchingTechStack && !techStackToDisplay?.length &&
            <p className='text-center feedback-empty'>No Skills Yet. {pathname.startsWith("/profile") && <span onClick={toggle}>Add Skills</span>}</p>
          }
        </Row>
        {
          techStacks.length > showMoreCount && !pathname.startsWith("/profile") &&
          <button onClick={handleShowMore} className='show-more-button'>{showMore ? 'Show Less' : 'Show More'}</button>
        }
      </div>
    </section>
  )
}

export default TechStack
