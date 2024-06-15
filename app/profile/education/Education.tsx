'use client'
import React, { FormEvent, MouseEventHandler, Suspense, useEffect, useRef, useState } from 'react'
import styles from '../../Styles/_workExperience.module.scss'
import { Collapse, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap'
import { LocationIconLight, CompanyIconLight, DateIconLight, DeleteIcon, EditIcon } from '../../Components/SVGs/SVGIcons'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { ProfileService } from '../../api/profileService'
import { toast } from 'sonner'
import { IEducation } from '../../interfaces/IEducation'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter, useParams, useSearchParams } from 'next/navigation'
import moment from 'moment'
import AddEducationModal from '../../Components/Modals/AddEducationModal'
import EditEducationModal from '../../Components/Modals/EditEducationModal'
import DeleteEducationModal from '../../Components/Modals/DeleteEducationModal'

function Education() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isCreatingEducation, setIsCreatingEducation] = useState(false)
  const [isUpdatingEducation, setIsUpdatingEducation] = useState(false)
  const [isFetchingEducation, setIsFetchingEducation] = useState(false)
  const [isDeletingEducation, setIsDeletingEducation] = useState(false)
  const [educations, setEducations] = useState<IEducation[]>()
  const [selectedEducation, setSelectedEducation] = useState<IEducation>()

  const { data: session } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { username } = useParams()

  const sectionRef = useRef(null)

  const toggleAddModal = () => setIsAddModalOpen(!isAddModalOpen)
  const selectEducation = (education: IEducation) => {
    setSelectedEducation(education)
  }
  const toggleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen)
  }
  const toggleDeleteModal = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen)
  }



  const handleFetchEducation = async () => {
    try {
      setIsFetchingEducation(true)
      const { data } = await ProfileService.FetchEducation(session?.user.token as string)
      setEducations(data)
      console.log(data)
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong fetching Educations. Try again!")
    } finally {
      setIsFetchingEducation(false)
    }
  }
  const handleFetchEducationByUsername = async () => {
    try {
      setIsFetchingEducation(true)
      const { data } = await ProfileService.FetchEducationByUsername(username as string)
      setEducations(data)
      console.log(data)
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong fetching Educations. Try again!")
    } finally {
      setIsFetchingEducation(false)
    }
  }

  const handleCreateEducation = async (values: IEducation) => {
    try {
      setIsCreatingEducation(true)
      await ProfileService.CreateEducation(values, session?.user.token as string)
      toast.success("Education saved successfully")
      handleFetchEducation()
      setIsAddModalOpen(false)
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong fetching Education. Try again!")
    } finally {
      setIsCreatingEducation(false)
    }
  }
  const handleUpdateEducation = async (values: IEducation) => {
    try {
      setIsUpdatingEducation(true)
      await ProfileService.UpdateEducation(values, selectedEducation?._id as string, session?.user.token as string)
      toast.success("Education updated successfully")
      handleFetchEducation()
      setIsEditModalOpen(false)
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong fetching Education. Try again!")
    } finally {
      setIsUpdatingEducation(false)
    }
  }
  const handleDeleteEducation = async () => {
    try {
      setIsDeletingEducation(true)
      await ProfileService.DeleteEducation(selectedEducation?._id as string, session?.user.token as string)
      toast.success("Education Deleted successfully")
      handleFetchEducation()
      setIsDeleteModalOpen(false)
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong fetching Education. Try again!")
    } finally {
      setIsDeletingEducation(false)
    }
  }


  // console.log(errors)
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
      handleFetchEducation()
    }
  }, [session])

  useEffect(() => {
    if (typeof window !== undefined && pathname.startsWith("/public")) {
      handleFetchEducationByUsername()
    }
    if (searchParams.get("education")) {
      scrollToTopOfSection(sectionRef)
    }
  }, [typeof window])
  return (
    <section ref={sectionRef} id='education' className={styles.workExperience}>

      <AddEducationModal closeBtn={closeBtnAdd} toggle={toggleAddModal} handleCreateEducation={handleCreateEducation} isModalOpen={isAddModalOpen} />
      {selectedEducation &&
        <EditEducationModal selectedEducation={selectedEducation as IEducation} closeBtn={closeBtnEdit} toggle={toggleEditModal} handleUpdateEducation={handleUpdateEducation} isModalOpen={isEditModalOpen} isUpdatingEducation={isUpdatingEducation} />
      }
      <DeleteEducationModal handleDeleteEducation={handleDeleteEducation} isModalOpen={isDeleteModalOpen} toggle={toggleDeleteModal} closeBtn={closeBtnDelete} isDeletingEducation={isDeletingEducation} />

      <h3 className={`app-heading ${pathname === '/profile/education' && 'text-start'}`}>Education</h3>
      {/* <p className='app-subheading'>Organizations I worked with.</p> */}
      {pathname.startsWith("/profile")
        &&
        <button className={styles.addModalbutton} onClick={toggleAddModal}>
          + Add Education
        </button>
      }

      <div className={`${styles.workExperience_container_public} ${pathname.startsWith('/profile') && styles.workExperience_container}`}>
        {
          isFetchingEducation && !educations?.length &&
          <div className='d-flex justify-content-center'>
            <Spinner style={{ width: "3rem", height: "3rem" }}>Loading...</Spinner>
          </div>
        }
        {educations && educations.map((education, index) => (
          <div key={index} className={styles.workExperience_item}>
            {
              pathname.startsWith("/profile") &&
              <div className={styles.overlay_actions}>
                <EditIcon onClick={() => {
                  setSelectedEducation(education);
                  // console.log(selectedEducation)
                  toggleEditModal()
                }} />
                <DeleteIcon onClick={() => {
                  setSelectedEducation(education);
                  toggleDeleteModal()
                }} />
              </div>
            }

            <div
              className={`d-flex align-items-center justify-content-between ${styles.workExperience_heading}`}
            >

              <div style={{ width: '60%' }} className={styles.workExperience_item_left}>
                <h4>{education.qualification}</h4>
                <div className={styles.workExperience_info}>
                  <p className='d-flex align-items-center gap-3 mb-0'><CompanyIconLight /> {education.school}</p>
                  {education.country &&
                    <p className='d-flex align-items-center gap-3 text-capitalize'><LocationIconLight /> {education.country}</p>
                  }
                </div>
              </div>
              <div className={styles.workExperience_item_right}>
                <span>{'full time'}</span>
                <p className='d-flex align-items-center gap-3 mb-0'><DateIconLight />{moment(education.startDate).format('MMM YYYY')}  {education.endDate && `- ${moment(education.endDate).format('MMM YYYY')}`}</p>
              </div>

            </div>

          </div>
        ))}
        {
          !isFetchingEducation && !educations?.length &&
          <p className='text-center feedback-empty'>No Education Found. {pathname.startsWith("/profile") && <span onClick={toggleAddModal}>Add Education</span>}</p>
        }
      </div>
    </section >
  )
}

export default function EducationPage() {

  return (

    <Suspense fallback={
      <div className='d-flex justify-content-center align-items-center'>
        <Spinner>Loading...</Spinner>
      </div>
    }>
      <Education />
    </Suspense>
  )
}