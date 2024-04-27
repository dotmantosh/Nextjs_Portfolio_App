'use client'
import React, { useState } from 'react'
import styles from '../Styles/_workExperience.module.scss'
import { Collapse, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { LocationIconLight, CompanyIconLight, DateIconLight } from './SVGs/SVGIcons'
import * as Yup from 'yup'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { useFormik } from 'formik'


function WorkExperience() {
  const [isOpenFaq1, setIsOpenFaq1] = useState(false)
  const [isOpenFaq2, setIsOpenFaq2] = useState(false)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [description, setDescription] = useState("")

  const toggle = () => setIsModalOpen(!isModalOpen)

  const initialValues = {
    title: '',
    company: '',
    workType: '',
    startDate: '',
    endDate: '',
    stillWorking: false
  }

  const workExperienceValidation = Yup.object().shape({
    stillWorking: Yup.boolean(),
    title: Yup.string().required("School is required"),
    company: Yup.string().required("Work type is required"),
    workType: Yup.string().required("Course is required"),
    startDate: Yup.date().required("Start Date is required"),
    endDate: Yup.date().when('stillWorking', {
      is: (val: boolean) => !val,
      then: () => Yup.string().required("End Date is required"),
      otherwise: () => Yup.string(),
    })
  });

  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: workExperienceValidation,
    onSubmit: async (values) => {
      console.log(values)
      // console.log(errors)
    }
  })

  const closeBtn = (
    <button className="app_modal_close" onClick={toggle} type="button">
      &times;
    </button>
  );
  return (
    <section className={styles.workExperience}>

      <button className={styles.addModalbutton} color="danger" onClick={toggle}>
        + Add Work Experience
      </button>
      <Modal
        contentClassName={'app_modal_content'}
        className={'app_modal'}
        centered isOpen={isModalOpen}
        size='md'
        toggle={toggle}>
        <ModalHeader className={'app_modal_header'} close={closeBtn} toggle={toggle}>Add Work Experience</ModalHeader>
        <form method='POST' onSubmit={handleSubmit}>
          <ModalBody className={'app_modal_body'}>
            <div className={styles.form_group}>
              <label>Job Title / Position</label>
              <input type="text"
                name='title'
                value={values.title}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.title && <small>{errors.title}</small>}
            </div>
            <div className={styles.form_group}>
              <label>Company / Organization</label>
              <input type="text"
                name='company'
                value={values.company}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.company && <small>{errors.company}</small>}
            </div>
            <div className={styles.form_group}>
              <label>Work type</label>
              <input type="text"
                name='workType'
                placeholder='e.g Hybrid'
                value={values.workType}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.workType && <small>{errors.workType}</small>}
            </div>
            <div className='d-flex gap-5'>
              <div className={styles.form_group}>
                <label>Start Date</label>
                <input type="date"
                  name='startDate'
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
                  name='endDate'
                  value={values.endDate}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  disabled={values.stillWorking}
                />
                {errors.endDate && <small>{errors.endDate}</small>}
                <div className={styles.end_date_non}>
                  <input type="checkbox" checked={values.stillWorking} name="stillWorking" id="stillWorking" onChange={handleChange} />
                  <label htmlFor="stillWorking">Still Working here?</label>
                </div>
              </div>
            </div>

            <div className={styles.form_group}>
              <label>Description</label>
              <div className={styles.form_description_quill}>

                <ReactQuill theme="snow" style={{ height: "100%", }} value={description} onChange={setDescription} />
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

      <h3 className="app-heading">Work Experience</h3>
      <p className='app-subheading'>Organizations I worked with.</p>

      <div className={styles.workExperience_container}>
        <div className={styles.workExperience_item}>
          <div
            className={`d-flex align-items-center justify-content-between ${styles.workExperience_heading}`}
            onClick={() => { setIsOpenFaq1(!isOpenFaq1) }}
          >
            <div className={styles.workExperience_item_left}>
              <h4>Junior Web Developer</h4>
              <div className={styles.workExperience_info}>
                <p className='d-flex align-items-center gap-3 mb-0'><CompanyIconLight /> Dr Cloud learning app</p>
                <p className='d-flex align-items-center gap-3 mb-0'><LocationIconLight /> Nigeria</p>
              </div>
            </div>
            <div className={styles.workExperience_item_right}>
              <span>Full Time</span>
              <p className='d-flex align-items-center gap-3 mb-0'><DateIconLight /> Sep 2021 - Dec 2021</p>
            </div>

          </div>
          <Collapse isOpen={isOpenFaq1}>
            <div className="pt-4">
              <p >Stellar AIO supports over 50 websites. Our most popular site modules include Amazon, Walmart, Target, Best Buy, The Home Depot, Academy, Pokémon Center, Fanatics, Topps, Panini, GameStop, BH Photo, Newegg, Converse, Dick Sporting Goods, Footlocker, FLX Raffles, SSense, Yeezy Supply, and all Shopify sites (Kith, Undefeated, and Shop Nice Kicks).
              </p>
            </div>
          </Collapse>
        </div>
        <div className={styles.workExperience_item}>
          <div
            className={`d-flex align-items-center justify-content-between ${styles.workExperience_heading}`}
            onClick={() => { setIsOpenFaq2(!isOpenFaq2) }}
          >
            <div className={styles.workExperience_item_left}>
              <h4>Junior Web Developer</h4>
              <div className={styles.workExperience_info}>
                <p className='d-flex align-items-center gap-3'><CompanyIconLight /> Dr Cloud learning app</p>
                <p className='d-flex align-items-center gap-3'><LocationIconLight /> Nigeria</p>
              </div>
            </div>
            <div className={styles.workExperience_item_right}>
              <span>Full Time</span>
              <p className='d-flex align-items-center gap-3'><DateIconLight /> Sep 2021 - Dec 2021</p>
            </div>

          </div>
          <Collapse isOpen={isOpenFaq2}>
            <div className="pt-4">
              <p >Stellar AIO supports over 50 websites. Our most popular site modules include Amazon, Walmart, Target, Best Buy, The Home Depot, Academy, Pokémon Center, Fanatics, Topps, Panini, GameStop, BH Photo, Newegg, Converse, Dick Sporting Goods, Footlocker, FLX Raffles, SSense, Yeezy Supply, and all Shopify sites (Kith, Undefeated, and Shop Nice Kicks).
              </p>
            </div>
          </Collapse>
        </div>

      </div>
    </section>
  )
}

export default WorkExperience