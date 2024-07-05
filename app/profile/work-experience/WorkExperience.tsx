'use client'
import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import styles from '../../Styles/_workExperience.module.scss'
import { Collapse, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap'
import { LocationIconLight, CompanyIconLight, DateIconLight } from '../../Components/SVGs/SVGIcons'
import * as Yup from 'yup'
// import ReactQuill from 'react-quill'
// import 'react-quill/dist/quill.snow.css';
import { useFormik } from 'formik'
import { ProfileService } from '../../api/profileService'
import { IWorkExperience } from '../../interfaces/IWorkExperience'
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter, useParams, useSearchParams } from 'next/navigation'
import { EditIcon, DeleteIcon } from '../../Components/SVGs/SVGIcons'
import dynamic from 'next/dynamic'
import AddWorkExperienceModal from '../../Components/Modals/AddWorkExperienceModal'
import EditWorkExperienceModal from '../../Components/Modals/EditWorkExperienceModal'
import DeleteWorkExperienceModal from '../../Components/Modals/DeleteWorkExperienceModal'
import moment from 'moment'


function WorkExperience() {
  const [isOpenFaq1, setIsOpenFaq1] = useState(false)
  const [isOpenFaq2, setIsOpenFaq2] = useState(false)

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const [isCreatingWorkExperience, setIsCreatingWorkExperience] = useState(false)
  const [isUpdatingWorkExperience, setIsUpdatingWorkExperience] = useState(false)
  const [isFetchingWorkExperience, setIsFetchingWorkExperience] = useState(false)
  const [isDeletingWorkExperience, setIsDeletingWorkExperience] = useState(false)
  const [workExperiences, setWorkExperiences] = useState<IWorkExperience[]>([])

  const [selectedWorkExperience, setSelectedWorkExperience] = useState<IWorkExperience>()


  const { data: session } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const { username } = useParams()
  const searchParams = useSearchParams()
  const sectionRef = useRef(null)


  const toggleAddModal = () => setIsAddModalOpen(!isAddModalOpen)
  const toggleEditModal = () => setIsEditModalOpen(!isEditModalOpen)
  const toggleDeleteModal = () => setIsDeleteModalOpen(!isDeleteModalOpen)

  const handleFetchWorkExperience = async () => {
    try {
      setIsFetchingWorkExperience(true)
      const { data } = await ProfileService.FetchWorkExperience(session?.user.token as string)
      const newWorkExperience = (data as IWorkExperience[]).map((workExperience) => {
        workExperience.isOpen = false
        return workExperience
      })
      setWorkExperiences(newWorkExperience)
      // console.log(data)
    } catch (error) {
      // console.log(error)
      toast.error("Something went wrong fetching WorkExperiences. Try again!")
    } finally {
      setIsFetchingWorkExperience(false)
    }
  }

  const handleFetchWorkExperienceByUsername = async () => {
    try {
      setIsFetchingWorkExperience(true)
      const { data } = await ProfileService.FetchWorkExperienceByUsername(username as string)
      const newWorkExperience = (data as IWorkExperience[]).map((workExperience) => {
        workExperience.isOpen = false
        return workExperience
      })
      if (newWorkExperience[0]) newWorkExperience[0].isOpen = true
      setWorkExperiences(newWorkExperience)
      // console.log(data)
    } catch (error) {
      // console.log(error)
      toast.error("Something went wrong fetching WorkExperiences. Try again!")
    } finally {
      setIsFetchingWorkExperience(false)
    }
  }

  const handleCreateWorkExperience = async (values: IWorkExperience) => {
    try {
      setIsCreatingWorkExperience(true)
      await ProfileService.CreateWorkExperience(values, session?.user.token as string)
      toast.success("WorkExperience saved successfully")
      handleFetchWorkExperience()
      setIsAddModalOpen(false)
    } catch (error) {
      // console.log(error)
      toast.error("Something went wrong fetching WorkExperience. Try again!")
    } finally {
      setIsCreatingWorkExperience(false)
    }
  }

  const handleUpdateWorkExperience = async (values: IWorkExperience) => {
    try {
      setIsUpdatingWorkExperience(true)
      await ProfileService.UpdateWorkExperience(values, selectedWorkExperience?._id as string, session?.user.token as string)
      toast.success("WorkExperience updated successfully")
      handleFetchWorkExperience()
      setIsEditModalOpen(false)
    } catch (error) {
      // console.log(error)
      toast.error("Something went wrong fetching WorkExperience. Try again!")
    } finally {
      setIsUpdatingWorkExperience(false)
    }
  }

  const handleDeleteWorkExperience = async () => {
    try {
      setIsDeletingWorkExperience(true)
      await ProfileService.DeleteWorkExperience(selectedWorkExperience?._id as string, session?.user.token as string)
      toast.success("Work Experience deleted successfully")
      handleFetchWorkExperience()
      setIsDeleteModalOpen(false)
    } catch (error) {
      // console.log(error)
      toast.error("Something went wrong fetching Education. Try again!")
    } finally {
      setIsDeletingWorkExperience(false)
    }
  }

  const handleToggleWorkExperience = (index: number) => {
    const updatedWorkExperiences = [...workExperiences as IWorkExperience[]];
    updatedWorkExperiences[index].isOpen = !updatedWorkExperiences[index].isOpen;
    setWorkExperiences(updatedWorkExperiences);
  };

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
  const scrollToTopOfSection = (sectionRef: any) => {
    if (sectionRef && sectionRef.current) {
      // Scroll to the top of the section
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  useEffect(() => {
    // if (!session) return router.push("/login")
    if (typeof window !== undefined && !pathname.startsWith("/public")) {
      handleFetchWorkExperience()
    }
    // console.log(workExperiences)
  }, [session])

  useEffect(() => {
    if (typeof window !== undefined && pathname.startsWith("/public")) {
      handleFetchWorkExperienceByUsername()
    }

  }, [typeof window])

  return (
    <section ref={sectionRef} id='workExperience' className={`${styles.workExperience} ${pathname.startsWith('/profile') && 'mt-0'}`}>

      <AddWorkExperienceModal
        isCreatingWorkExperience={isCreatingWorkExperience}
        handleCreateWorkExperience={handleCreateWorkExperience} isModalOpen={isAddModalOpen}
        toggle={toggleAddModal}
        closeBtn={closeBtnAdd}
      />
      {selectedWorkExperience &&
        <EditWorkExperienceModal
          selectedWorkExperience={selectedWorkExperience as IWorkExperience}
          isUpdatingWorkExperience={isUpdatingWorkExperience}
          handleUpdateWorkExperience={handleUpdateWorkExperience} isModalOpen={isEditModalOpen}
          toggle={toggleEditModal}
          closeBtn={closeBtnEdit}
        />
      }

      <DeleteWorkExperienceModal
        isDeletingWorkExperience={isDeletingWorkExperience}
        handleDeleteWorkExperience={handleDeleteWorkExperience} isModalOpen={isDeleteModalOpen} toggle={toggleDeleteModal} closeBtn={closeBtnDelete} />

      <h3 className={`app-heading ${pathname === '/profile/work-experience' && 'text-start'}`}>Work Experience</h3>
      <p className={`app-subheading ${pathname === '/profile/work-experience' && 'text-start'}`}>Organizations I worked with.</p>
      {
        pathname.startsWith("/profile") &&
        <button className={styles.addModalbutton} onClick={toggleAddModal}>
          + Add Work Experience
        </button>
      }
      <div className={`${styles.workExperience_container_public} ${pathname.startsWith('/profile') && styles.workExperience_container}`}>
        {
          isFetchingWorkExperience && !workExperiences?.length &&
          <div className='d-flex justify-content-center'>
            <Spinner style={{ width: "3rem", height: "3rem" }}>Loading...</Spinner>
          </div>
        }
        {
          workExperiences && workExperiences.map((workExperience, index) => (

            <div key={index} className={styles.workExperience_item}>
              {
                pathname.startsWith("/profile") &&
                <div className={styles.overlay_actions}>
                  <EditIcon onClick={() => {
                    setSelectedWorkExperience(workExperience)
                    toggleEditModal()
                  }} />
                  <DeleteIcon onClick={() => {
                    setSelectedWorkExperience(workExperience)
                    toggleDeleteModal()
                  }} />
                </div>
              }
              <div
                className={`d-flex align-items-center justify-content-between ${styles.workExperience_heading}`}
                onClick={() => handleToggleWorkExperience(index)}
              >
                <div className={styles.workExperience_item_left}>
                  <h4>{workExperience.title}</h4>
                  <div className={styles.workExperience_info}>
                    <p className='d-flex align-items-center gap-3 mb-0'><CompanyIconLight /> {workExperience.company}</p>
                    <p className='d-flex align-items-center gap-3 mb-0 text-capitalize'><LocationIconLight /> {workExperience.state && `${workExperience.state}, `} {workExperience.country} </p>
                  </div>
                </div>
                <div className={styles.workExperience_item_right}>
                  <span>{workExperience.employmentType}</span>
                  <p className='d-flex align-items-center gap-3 mb-0'><DateIconLight /> {moment(workExperience.startDate).format("MMM YYYY")} - {workExperience.stillWorkingHere ? "Still working here" : moment(workExperience.endDate).format('MMM YYYY')}</p>
                </div>

              </div>
              <Collapse isOpen={workExperience.isOpen}>
                <div className="pt-4">
                  <p dangerouslySetInnerHTML={{ __html: workExperience.description.toString() }}>
                  </p>
                </div>
              </Collapse>
            </div>
          ))
        }

        {
          !isFetchingWorkExperience && !workExperiences?.length &&
          <p className='text-center feedback-empty'>No Work Experience Yet. {pathname.startsWith("/profile") && <span onClick={toggleAddModal}>Add Work Experience</span>}</p>
        }
      </div>
    </section>
  )
}

export default function WorkExperiencePage() {

  return (

    <Suspense fallback={
      <div className='d-flex justify-content-center align-items-center'>
        <Spinner>Loading...</Spinner>
      </div>
    }>
      <WorkExperience />
    </Suspense>
  )
}