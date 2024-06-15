'use client'
import React, { useEffect, useState, useMemo, useRef } from 'react'
import styles from '../../Styles/_projects.module.scss'
import { Col, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner } from 'reactstrap'
import ProjectCard from '../../Components/Cards/ProjectCard'
// import ReactQuill from 'react-quill'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { AddPhotoIcon } from '@/public/imgs/images'
import Image from 'next/image'
import { ProfileService } from '../../api/profileService'
import { toast } from 'sonner'
import { IProject } from '../../interfaces/IProject'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter, useParams, useSearchParams } from 'next/navigation'
import AddProjectModal from '../../Components/Modals/AddProjectModal'
import EditProjectModal from '../../Components/Modals/EditProjectModal'
import DeleteProjectModal from '../../Components/Modals/DeleteProjectModal'

function Projects() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const [isCreatingProject, setIsCreatingProject] = useState(false)
  const [isUpdatingProject, setIsUpdatingProject] = useState(false)
  const [isDeletingProject, setIsDeletingProject] = useState(false)
  const [isFetchingProject, setIsFetchingProject] = useState(false)
  const [description, setDescription] = useState("")
  const [photo, setPhoto] = useState<string>()
  const [imgUrl, setImgUrl] = useState<string>()
  const [photoErrorMsg, setPhotoErrorMsg] = useState<string>()
  const [projects, setProjects] = useState<IProject[]>()
  const [projectsToDisplay, setProjectsToDisplay] = useState<IProject[]>()
  const [windowReady, setWindowReady] = useState(false)
  const [selectedProject, setSelectedProject] = useState<IProject>()

  const [showMore, setShowMore] = useState(false)
  const showMoreCount = 6

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const sectionRef = useRef(null)

  const { data: session } = useSession()
  const { username } = useParams()

  const toggleAddModal = () => setIsAddModalOpen(!isAddModalOpen)
  const toggleEditModal = () => setIsEditModalOpen(!isEditModalOpen)
  const toggleDeleteModal = () => setIsDeleteModalOpen(!isDeleteModalOpen)

  const closeBtnAdd = (
    <button className="app_modal_close" onClick={toggleAddModal} type="button">
      &times;
    </button>
  );
  const closeBtnEdit = (
    <button className="app_modal_close" onClick={toggleEditModal} type="button">
      &times;
    </button>
  );
  const closeBtnDelete = (
    <button className="app_modal_close" onClick={toggleDeleteModal} type="button">
      &times;
    </button>
  );


  const handleFetchProject = async () => {
    try {
      setIsFetchingProject(true)
      const { data } = await ProfileService.FetchProject(session?.user.token as string)
      setProjects(data)
      console.log(data)
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong fetching Projects. Try again!")
    } finally {
      setIsFetchingProject(false)
    }
  }

  const handleFetchProjectByUsername = async () => {
    try {
      setIsFetchingProject(true)
      const { data } = await ProfileService.FetchProjectByUsername(username as string)
      setProjects(data)
      pathname.startsWith('/public') ? setProjectsToDisplay(data.slice(0, showMoreCount)) : setProjectsToDisplay(data)
      // console.log(data)
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong fetching Projects. Try again!")
    } finally {
      setIsFetchingProject(false)
    }
  }

  const handleCreateProject = async (values: IProject) => {
    try {
      setIsCreatingProject(true)
      await ProfileService.CreateProject(values, session?.user.token as string)
      toast.success("Project saved successfully")
      handleFetchProject()
      setIsAddModalOpen(false)
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong fetching Project. Try again!")
    } finally {
      setIsCreatingProject(false)
    }
  }

  const handleUpdateProject = async (values: IProject) => {
    try {
      setIsUpdatingProject(true)
      await ProfileService.UpdateProject(values, selectedProject?._id as string, session?.user.token as string)
      toast.success("Project saved successfully")
      handleFetchProject()
      setIsAddModalOpen(false)
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong fetching Project. Try again!")
    } finally {
      setIsUpdatingProject(false)
    }
  }

  const handleDeleteProject = async () => {
    try {
      setIsDeletingProject(true)
      await ProfileService.DeleteProject(selectedProject?._id as string, session?.user.token as string)
      toast.success("Project saved successfully")
      handleFetchProject()
      setIsDeleteModalOpen(false)
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong fetching Project. Try again!")
    } finally {
      setIsDeletingProject(false)
    }
  }

  const handleOnEditButtonClicked = (project: IProject) => {
    console.log(project)
    setSelectedProject(project)
    setIsEditModalOpen(true)
  }
  const handleOnDeleteButtonClicked = (project: IProject) => {
    console.log(project)
    setSelectedProject(project)
    setIsDeleteModalOpen(true)
  }

  const scrollToTopOfSection = (sectionRef: any) => {
    if (sectionRef && sectionRef.current) {
      // Scroll to the top of the section
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    if (typeof window !== undefined && !pathname.startsWith('/public')) {
      handleFetchProject()
    }
  }, [session])

  useEffect(() => {
    if (typeof window !== undefined && (pathname.startsWith('/public')) || (pathname.startsWith('/project'))) {
      handleFetchProjectByUsername()
    }
    if (searchParams.get("projects")) {
      scrollToTopOfSection(sectionRef)
    }
  }, [typeof window])
  return (
    <section ref={sectionRef} id='projects' className={`${styles.projects} ${pathname === "/profile/project" && 'mt-0'}`}>

      <AddProjectModal toggle={toggleAddModal} handleCreateProject={handleCreateProject} closeBtn={closeBtnAdd} isModalOpen={isAddModalOpen} />
      {
        selectedProject &&
        <EditProjectModal
          selectedProject={selectedProject as IProject}
          toggle={toggleEditModal} handleUpdateProject={handleUpdateProject} closeBtn={closeBtnEdit} isModalOpen={isEditModalOpen} />
      }
      {
        selectedProject &&
        <DeleteProjectModal handleDeleteProject={handleDeleteProject} isModalOpen={isDeleteModalOpen} toggle={toggleDeleteModal} closeBtn={closeBtnDelete} isDeletingProject={isDeletingProject} />
      }

      <h3 className={`app-heading ${pathname === "/profile/project" && 'text-start'}`}>My Projects</h3>
      <p className={`app-subheading ${pathname === "/profile/project" && 'text-start'} `}>Things I've built so far</p>
      {
        pathname.startsWith("/profile") &&
        <button className={styles.addModalbutton} onClick={toggleAddModal}>
          + Add Project
        </button>
      }
      <div className={styles.projectsWrapper}>
        <Row>
          {
            isFetchingProject && !projects?.length &&
            <div className='d-flex justify-content-center'>
              <Spinner style={{ width: "3rem", height: "3rem" }}>Loading...</Spinner>
            </div>
          }
          {projects && projects.map((project, index) => (
            <Col key={index} lg={4} md={6} sm={12} className={styles.projectCol}>
              <ProjectCard onDeleteIconClicked={handleOnDeleteButtonClicked} onEditIconClicked={handleOnEditButtonClicked} project={project} />
            </Col>
          ))}

          {
            !isFetchingProject && !projects?.length &&
            <p className='text-center feedback-empty'>No Projects Found. {pathname.startsWith("/profile") && <span onClick={toggleAddModal}>Add Project</span>}</p>
          }
        </Row>
        {
          projects && projects.length > showMoreCount && pathname.startsWith('/public') &&
          <button onClick={() => { router.push(`/project/${username}`) }} className='show-more-button'>showMore</button>
        }
      </div>
    </section>
  )
}

export default Projects
