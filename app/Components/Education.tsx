'use client'
import React, { FormEvent, MouseEventHandler, useState } from 'react'
import styles from '../Styles/_workExperience.module.scss'
import { Collapse, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { LocationIconLight, CompanyIconLight, DateIconLight } from './SVGs/SVGIcons'
import * as Yup from 'yup'
import { useFormik } from 'formik'

function Education() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const toggle = () => setIsModalOpen(!isModalOpen)

  const initialValues = {
    school: '',
    course: '',
    startDate: '',
    endDate: '',
    stillSchooling: false
  }

  const educationValidation = Yup.object().shape({
    stillSchooling: Yup.boolean(),
    school: Yup.string().required("School is required"),
    course: Yup.string().required("Course is required"),
    startDate: Yup.date().required("Start Date is required"),
    endDate: Yup.date().when('stillSchooling', {
      is: (val: boolean) => !val,
      then: () => Yup.string().required("End Date is required"),
      otherwise: () => Yup.string(),
    })
  });

  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: educationValidation,
    onSubmit: async (values) => {
      console.log(values)
      // console.log(errors)
    }
  })
  // console.log(errors)
  const closeBtn = (
    <button className="app_modal_close" onClick={toggle} type="button">
      &times;
    </button>
  );
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
              <label>School</label>
              <input type="text"
                name="school"
                value={values.school}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.school && <small>{errors.school}</small>}
            </div>
            <div className={styles.form_group}>
              <label>Course / Discipline</label>
              <input type="text"
                name="course"
                value={values.course}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.course && <small>{errors.course}</small>}
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
        <div className={styles.workExperience_item}>
          <div
            className={`d-flex align-items-center justify-content-between`}
          >
            <div style={{ width: '60%' }} className={styles.workExperience_item_left}>
              <h4>B.sc Computer Science and Engineering</h4>
              <div className={styles.workExperience_info}>
                <p className='d-flex align-items-center gap-3 mb-0'><CompanyIconLight /> Obafemi Awolowo University</p>
                {/* <p className='d-flex align-items-center gap-3'><LocationIconLight /> Nigeria</p> */}
              </div>
            </div>
            <div className={styles.workExperience_item_right}>
              <span>Full Time</span>
              <p className='d-flex align-items-center gap-3 mb-0'><DateIconLight /> Sep 2021 - Dec 2021</p>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

export default Education