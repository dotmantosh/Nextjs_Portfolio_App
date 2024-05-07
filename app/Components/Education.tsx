'use client'
import React, { FormEvent, MouseEventHandler, useEffect, useState } from 'react'
import styles from '../Styles/_workExperience.module.scss'
import { Collapse, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { LocationIconLight, CompanyIconLight, DateIconLight, DeleteIcon, EditIcon } from './SVGs/SVGIcons'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { ProfileService } from '../api/profileService'
import { toast } from 'sonner'
import { IEducation } from '../interfaces/IEducation'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import moment from 'moment'

function Education() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCreatingEducation, setIsCreatingEducation] = useState(false)
  const [isFetchingEducation, setIsFetchingEducation] = useState(false)
  const [educations, setEducations] = useState<IEducation[]>()

  const { data: session } = useSession()
  const router = useRouter()

  const toggle = () => setIsModalOpen(!isModalOpen)

  const initialValues = {
    school: '',
    qualification: '',
    startDate: '',
    endDate: '',
    programType: '',
    stillSchooling: false
  }

  const educationValidation = Yup.object().shape({
    stillSchooling: Yup.boolean(),
    school: Yup.string().required("School is required"),
    qualification: Yup.string().required("Qualificaition is required"),
    startDate: Yup.date().required("Start Date is required"),
    endDate: Yup.date().when('stillSchooling', {
      is: (val: boolean) => !val,
      then: () => Yup.string().required("End Date is required"),
      otherwise: () => Yup.string(),
    })
  });

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

  const handleCreateEducation = async (values: IEducation) => {
    try {
      setIsCreatingEducation(true)
      await ProfileService.CreateEducation(values, session?.user.token as string)
      toast.success("Education saved successfully")
      handleFetchEducation()
      setIsModalOpen(false)
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong fetching Education. Try again!")
    } finally {
      setIsCreatingEducation(false)
    }
  }
  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: educationValidation,
    onSubmit: async (values) => {
      console.log(values)
      handleCreateEducation(values as IEducation)
      // console.log(errors)
    }
  })

  // console.log(errors)
  const closeBtn = (
    <button className="app_modal_close" onClick={toggle} type="button">
      &times;
    </button>
  );

  useEffect(() => {
    if (!session) return router.push("/login")
    handleFetchEducation()
  }, [])
  return (
    <section className={styles.workExperience}>
      <button className={styles.addModalbutton} color="danger" onClick={toggle}>
        + Add Education
      </button>
      <Modal
        contentClassName={'app_modal_content'}
        className={'app_modal'}
        centered isOpen={isModalOpen}
        size='md'
        toggle={toggle}>
        <ModalHeader className={'app_modal_header'} close={closeBtn} toggle={toggle}>Add Education</ModalHeader>
        <form onSubmit={handleSubmit} method='POST'>

          <ModalBody className={'app_modal_body'}>

            <div className={styles.form_group}>
              <label>Qualification</label>
              <input type="text"
                name="qualification"
                value={values.qualification}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.qualification && <small>{errors.qualification}</small>}
            </div>
            <div className={styles.form_group}>
              <label>School</label>
              <input type="text"
                name="school"
                value={values.school}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.school && <small>{errors.school}</small>}
            </div>
            <div className='d-flex gap-5'>
              <div className={styles.form_group}>
                <label>Start Date</label>
                <input type="date"
                  name="startDate"
                  value={values.startDate}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.startDate && <small>{errors.startDate}</small>}
              </div>
              <div className={`position-relative ${styles.form_group}`}>
                <label>
                  End Date
                </label>
                <input type="date"
                  name="endDate"
                  value={values.endDate}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  disabled={values.stillSchooling}
                />
                {errors.endDate && <small>{errors.endDate}</small>}
                <div className={styles.end_date_non}>
                  <input name="stillSchooling" checked={values.stillSchooling} type="checkbox" id="stillSchooling" onChange={handleChange} />
                  <label htmlFor="stillSchooling">Still Schooling?</label>
                </div>
              </div>
            </div>
            <div className={styles.form_group}>
              <label className='mt-4'>Program Type</label>
              <div className={styles.programType}>
                <div className={styles.fullTime}>
                  <small>Full Time</small>
                  <input type="radio" name='programType' onChange={handleChange} value={'Full Time'} checked={values.programType === 'Full Time'} />
                </div>
                <div className={styles.partTime}>
                  <small>Part Time</small>
                  <input type="radio" name='programType' onChange={handleChange} value={'Part Time'} checked={values.programType === 'Part Time'} />
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter className={'app_modal_footer'}>
            <button className='app_modal_cancel' onClick={toggle}>
              Cancel
            </button>{' '}
            <button type='submit' className='app_modal_save'>
              Save
            </button>
          </ModalFooter>
        </form>
      </Modal>

      <h3 className="app-heading">Education</h3>
      {/* <p className='app-subheading'>Organizations I worked with.</p> */}

      <div style={{ marginTop: "8rem" }} className={styles.workExperience_container}>

        {educations && educations.map((education, index) => (
          <div key={index} className={styles.workExperience_item}>
            <div className={styles.overlay_actions}>
              <EditIcon onClick={() => { }} />
              <DeleteIcon onClick={() => { }} />
            </div>

            <div
              className={`d-flex align-items-center justify-content-between $`}
            >

              <div style={{ width: '60%' }} className={styles.workExperience_item_left}>
                <h4>{education.qualification}</h4>
                <div className={styles.workExperience_info}>
                  <p className='d-flex align-items-center gap-3 mb-0'><CompanyIconLight /> {education.school}</p>
                  {/* <p className='d-flex align-items-center gap-3'><LocationIconLight /> Nigeria</p> */}
                </div>
              </div>
              <div className={styles.workExperience_item_right}>
                <span>{'full time'}</span>
                <p className='d-flex align-items-center gap-3 mb-0'><DateIconLight />{moment(education.startDate).format('MMM YYYY')}  {education.endDate && `- ${moment(education.endDate).format('MMM YYYY')}`}</p>
              </div>

            </div>

          </div>
        ))}

      </div>
    </section>
  )
}

export default Education