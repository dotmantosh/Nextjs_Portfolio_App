'use client'
import React, { useState } from 'react'
import styles from '../Styles/_projects.module.scss'
import { Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import ProjectCard from './Cards/ProjectCard'
import ReactQuill from 'react-quill'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { AddPhotoIcon } from '@/public/imgs/images'
import Image from 'next/image'

function Projects() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const toggle = () => setIsModalOpen(!isModalOpen)
  const [description, setDescription] = useState("")

  const closeBtn = (
    <button className="app_modal_close" onClick={toggle} type="button">
      &times;
    </button>
  );

  const initialValues = {
    title: '',
    gitRepo: '',
    previewLink: '',
    startDate: '',
    endDate: '',
    skills: ''
  }

  const projectValidation = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    gitRepo: Yup.string(),
    previewLink: Yup.string(),
    startDate: Yup.date(),
    endDate: Yup.date(),
  });

  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: projectValidation,
    onSubmit: async (values) => {
      console.log(values)
      // console.log(errors)
    }
  })
  return (
    <section className={styles.projects}>
      <button className={styles.addModalbutton} color="danger" onClick={toggle}>
        + Add Project
      </button>
      <Modal
        contentClassName={'app_modal_content'}
        className={'app_modal'}
        centered isOpen={isModalOpen}
        size='md'
        toggle={toggle}>
        <ModalHeader className={'app_modal_header'} close={closeBtn} toggle={toggle}>Add Project</ModalHeader>
        <form onSubmit={handleSubmit} method="POST">
          <ModalBody className={'app_modal_body'}>
            <div className={styles.add_image_wrapper}>
              <div className={styles.add_image_img}>
                {
                  <Image src={AddPhotoIcon} alt='img' className='add_image_icon' />
                }
              </div>
              <div>

                <label htmlFor="addImage">
                  <input type="file" id="addImage" className={styles.add_image_input} />

                  + Add Image
                </label>
              </div>
            </div>
            <div className={styles.form_group}>
              <label>Title / Name</label>
              <input type="text"
                name='title'
                placeholder='Enter Project Name'
                value={values.title}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.title && <small>{errors.title}</small>}
            </div>
            <div className='d-flex gap-5'>
              <div className={styles.form_group}>
                <label>Start Date</label>
                <input type="date" name='startDate'
                  value={values.startDate}
                  onBlur={handleBlur}
                  onChange={handleChange} />
              </div>
              <div className={`position-relative ${styles.form_group}`}>
                <label>
                  End Date
                </label>
                <input type="date" name='endDate'
                  value={values.endDate}
                  onBlur={handleBlur}
                  onChange={handleChange} />
              </div>
            </div>
            <div className={styles.form_group}>
              <label>Live Preview Link</label>
              <input type="text" placeholder='e.g https://abc.com' name='previewLink'
                value={values.previewLink}
                onBlur={handleBlur}
                onChange={handleChange} />
            </div>
            <div className={styles.form_group}>
              <label>Git Remote Repo Link</label>
              <input type="text" placeholder='e.g https://github.com/abc/repo_name' name='gitRepo'
                value={values.gitRepo}
                onBlur={handleBlur}
                onChange={handleChange} />
            </div>
            <div className={styles.form_group}>
              <label>Skills Used</label>
              <input type="text" placeholder='Select the skills you used' name='skills'
                value={values.skills}
                onBlur={handleBlur}
                onChange={handleChange} />
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
            <button type="submit" className='app_modal_save'>
              Save
            </button>
          </ModalFooter>
        </form>
      </Modal>

      <h3 className={`app-heading`}>My Projects</h3>
      <p className='app-subheading'>Things I've built so far</p>

      <div className={styles.projectsWrapper}>
        <Row>
          <Col md={4} className={styles.projectCol}>
            <ProjectCard />
          </Col>
          <Col md={4} className={styles.projectCol}>
            <ProjectCard />
          </Col>
          <Col md={4} className={styles.projectCol}>
            <ProjectCard />
          </Col>
          <Col md={4} className={styles.projectCol}>
            <ProjectCard />
          </Col>
          <Col md={4} className={styles.projectCol}>
            <ProjectCard />
          </Col>
          <Col md={4} className={styles.projectCol}>
            <ProjectCard />
          </Col>

        </Row>
      </div>
    </section>
  )
}

export default Projects
