'use client'
import React, { useEffect, useState, useMemo } from 'react'
import styles from '../Styles/_projects.module.scss'
import { Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import ProjectCard from './Cards/ProjectCard'
import ReactQuill from 'react-quill'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { AddPhotoIcon } from '@/public/imgs/images'
import Image from 'next/image'
import { ProfileService } from '../api/profileService'
import { toast } from 'sonner'
import { IProject } from '../interfaces/IProject'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

function Projects() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [isCreatingProject, setIsCreatingProject] = useState(false)
  const [isFetchingProject, setIsFetchingProject] = useState(false)
  const [description, setDescription] = useState("")
  const [photo, setPhoto] = useState<string>()
  const [imgUrl, setImgUrl] = useState<string>()
  const [photoErrorMsg, setPhotoErrorMsg] = useState<string>()
  const [projects, setProjects] = useState<IProject[]>()
  const [windowReady, setWindowReady] = useState(false)

  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);

  const { data: session } = useSession()
  const router = useRouter()

  const toggle = () => setIsModalOpen(!isModalOpen)

  const closeBtn = (
    <button className="app_modal_close" onClick={toggle} type="button">
      &times;
    </button>
  );

  const initialValues = {
    name: '',
    githubRepo: '',
    livePreviewLink: '',
    startDate: '',
    endDate: '',
    skills: [],
    description: '',
    photo: ''
  }

  const projectValidation = Yup.object().shape({
    name: Yup.string().required("Title is required"),
    githubRepo: Yup.string(),
    livePreviewLink: Yup.string(),
    startDate: Yup.date(),
    endDate: Yup.date(),
  });

  const handleFileUpload = (e: any) => {
    // Get the selected file
    const selectedFile: File = e.target.files[0];
    console.log('File: ', selectedFile)
    // If a valid file was selected...
    if (
      selectedFile.type === 'image/jpg' ||
      selectedFile.type === 'image/png' ||
      selectedFile.type === 'image/jpeg' ||
      selectedFile.type === 'image/webp'
    ) {
      // Unset validation message
      setPhotoErrorMsg(undefined);

      const file = e.target.files[0]; // Get the selected file

      if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
          const base64URL: string = e.target?.result as string; // This is the base64 URL of the image

          if (base64URL) {
            // Extract only the base64 string (remove "data:image/jpeg;base64," prefix)
            const base64String = base64URL.split(',')[1];

            // console.log('base64URL: ', base64String);

            // Update form values
            setPhoto(
              base64String,
            );
          }
        };

        // Read the file as a data URL (base64-encoded)
        reader.readAsDataURL(file);
      }
    }
    // Otherwise...
    else {
      // Set appropriate validation message
      setPhotoErrorMsg('Please select a valid photo');

      // Exit this method
      return;
    }

    // Set the image url
    const imageURL = URL.createObjectURL(selectedFile);

    // Update the image url state
    setImgUrl(imageURL);
    console.log(imgUrl)
  };

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

  const handleCreateProject = async (values: IProject) => {
    try {
      setIsCreatingProject(true)
      await ProfileService.CreateProject(values, session?.user.token as string)
      toast.success("Project saved successfully")
      handleFetchProject()
      setIsModalOpen(false)
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong fetching Project. Try again!")
    } finally {
      setIsCreatingProject(false)
    }
  }
  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: projectValidation,
    onSubmit: async (values) => {
      console.log(values)
      values.description = description
      values.photo = photo as string
      handleCreateProject(values as IProject)
      // console.log(errors)
    }
  })
  useEffect(() => {
    window && setWindowReady(true)
  }, [window])
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
                  imgUrl ? <Image src={imgUrl} alt='img' className={styles.imgUrl} fill /> : <Image src={AddPhotoIcon} alt='img' className='add_image_icon' />
                }
              </div>
              <div>

                <label htmlFor="addImage">
                  <input type="file" id="addImage" className={styles.add_image_input} onChange={handleFileUpload} />
                  + Add Image
                </label>
              </div>
            </div>
            <div className={styles.form_group}>
              <label>Title / Name</label>
              <input type="text"
                name='name'
                placeholder='Enter Project Name'
                value={values.name}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.name && <small>{errors.name}</small>}
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
                value={values.livePreviewLink}
                onBlur={handleBlur}
                onChange={handleChange} />
            </div>
            <div className={styles.form_group}>
              <label>Git Remote Repo Link</label>
              <input type="text" placeholder='e.g https://github.com/abc/repo_name' name='gitRepo'
                value={values.githubRepo}
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
                {
                  windowReady &&
                  <ReactQuill theme="snow" style={{ height: "100%", }} value={description} onChange={setDescription} />
                }
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
