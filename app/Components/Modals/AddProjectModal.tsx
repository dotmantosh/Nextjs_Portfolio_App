'use client'
import { IProject } from '@/app/interfaces/IProject';
import React, { useEffect, useMemo, useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap';
import * as Yup from 'yup'
import styles from '../../Styles/_projects.module.scss'
import { useFormik } from 'formik';
import Image from 'next/image';
import { AddPhotoIcon } from '@/public/imgs/images'
import dynamic from 'next/dynamic'
import Select, { components } from 'react-select'
import { customStyle } from '@/app/helpers/selectStyles'
import { ProfileService } from '@/app/api/profileService';
import { ISkill } from '@/app/interfaces/ISkill';
import { toast } from 'sonner';



interface AddModalProps {
  handleCreateProject: (values: IProject) => void
  isCreatingProject: boolean
  isModalOpen: boolean
  toggle: () => void
  closeBtn: React.ReactElement<HTMLButtonElement>;
}

interface IOptionProp {
  label: string,
  value: string
}

const AddProjectModal = ({ handleCreateProject, isModalOpen, toggle, isCreatingProject, closeBtn }: AddModalProps) => {
  const [photoErrorMsg, setPhotoErrorMsg] = useState<string>()
  const [isFetchingProject, setIsFetchingProject] = useState(false)
  const [description, setDescription] = useState("")
  const [photo, setPhoto] = useState<string>()
  const [imgUrl, setImgUrl] = useState<string>()
  const [projects, setProjects] = useState<IProject[]>()
  const [windowReady, setWindowReady] = useState(false)
  const [skillsOptions, setSkillsOptions] = useState<IOptionProp[]>()
  const [selectedSkills, setSelectedSkills] = useState<IOptionProp[]>([])


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
  });

  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: projectValidation,
    onSubmit: async (values) => {
      values.description = description
      values.photo = photo as string
      values.skills = selectedSkills.map((skill) => skill.value) as never[]
      // console.log(values)
      handleCreateProject(values as IProject)
      // console.log(errors)
    }
  })

  const handleFileUpload = (e: any) => {
    // Get the selected file
    const selectedFile: File = e.target.files[0];
    // console.log('File: ', selectedFile)
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
            const base64String = base64URL
            // console.log(base64URL)

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
    // console.log(imgUrl)
  };

  // const handleSkillsChange = (option: any) => {
  // console.log(value)
  // setSkills(option)
  // setFieldValue("skills", option.)
  // }

  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);

  const fetchSkills = async () => {
    try {
      const skills = (await ProfileService.FetchSkills()).data
      const newSkillOptions = skills.map((skill: ISkill) => ({
        value: skill._id,
        label: skill.name,
      }));
      setSkillsOptions(newSkillOptions)
    } catch (error) {
      toast.error("Could not load skills.")
    }
  }
  useEffect(() => {
    fetchSkills()
  }, [])
  return (
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
            {errors.name && <small className='form-error-feedback'>{errors.name}</small>}
          </div>

          <div className={styles.form_group}>
            <label>Live Preview Link</label>
            <input type="text" placeholder='e.g https://abc.com' name='livePreviewLink'
              value={values.livePreviewLink}
              onBlur={handleBlur}
              onChange={handleChange} />
          </div>
          <div className={styles.form_group}>
            <label>Git Remote Repo Link</label>
            <input type="text" placeholder='e.g https://github.com/abc/repo_name' name='githubRepo'
              value={values.githubRepo}
              onBlur={handleBlur}
              onChange={handleChange} />
          </div>
          <div className={styles.form_group}>
            <label>Skills Used</label>
            <Select
              isMulti
              options={skillsOptions}
              name='skills'
              onChange={(selectedOptions) => setSelectedSkills(selectedOptions as IOptionProp[])}
              className='app_select'
              classNamePrefix='select'
              value={selectedSkills}
              styles={customStyle}
              closeMenuOnSelect={false}
              placeholder=""

            />

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
            <label>Description</label>


            <ReactQuill theme="snow" style={{ height: "200px", color: "#000", background: "#fff", overflow: "auto" }} value={description} onChange={setDescription} />


          </div>
        </ModalBody>
        <ModalFooter className={'app_modal_footer'}>
          <button className='app_modal_cancel' onClick={toggle}>
            Cancel
          </button>{' '}
          <button type='submit' className='app_modal_save'>
            {
              isCreatingProject ? <Spinner>Loading...</Spinner>
                :
                "Save"
            }

          </button>
        </ModalFooter>
      </form>
    </Modal>
  )
}

export default AddProjectModal