'use client'
import { IWorkExperience } from '@/app/interfaces/IWorkExperience';
import React, { useEffect, useMemo, useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap';
import * as Yup from 'yup'
import styles from '../../Styles/_workExperience.module.scss'
import { useFormik } from 'formik';
import Image from 'next/image';
import { AddPhotoIcon } from '@/public/imgs/images'
import dynamic from 'next/dynamic'
import Select from 'react-select'
import { customStyle } from '@/app/helpers/selectStyles';
import { ProfileService } from '@/app/api/profileService';
import { ISkill } from '@/app/interfaces/ISkill';
import { toast } from 'sonner';

interface AddModalProps {
  handleCreateWorkExperience: (values: IWorkExperience) => void
  isModalOpen: boolean
  isCreatingWorkExperience: boolean
  toggle: () => void
  closeBtn: React.ReactElement<HTMLButtonElement>;
}

interface IOptionProp {
  label: string,
  value: string
}
const AddWorkExperienceModal = ({ handleCreateWorkExperience, isCreatingWorkExperience, isModalOpen, toggle, closeBtn }: AddModalProps) => {
  const [description, setDescription] = useState("")
  const [workType, setWorkType] = useState()
  const [employmentType, setEmploymentType] = useState()
  const [skillsOptions, setSkillsOptions] = useState<IOptionProp[]>()
  const [selectedSkills, setSelectedSkills] = useState<IOptionProp[]>([])

  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);

  const initialValues = {
    title: '',
    company: '',
    workType: '',
    employmentType: '',
    skills: [],
    state: '',
    country: '',
    startDate: '',
    endDate: '',
    description: '',
    stillWorkingHere: false
  }

  const workExperienceValidation = Yup.object().shape({
    stillWorking: Yup.boolean(),
    title: Yup.string().required("Job Title is required"),
    company: Yup.string().required("Organization is required"),
    workType: Yup.string().required("Work Type is required"),
    startDate: Yup.date().required("Start Date is required"),
    endDate: Yup.date().when('stillWorkingHere', {
      is: (val: boolean) => !val,
      then: () => Yup.string().required("End Date is required"),
      otherwise: () => Yup.string(),
    })
  });

  const { values, errors, setFieldValue, resetForm, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: workExperienceValidation,
    onSubmit: async (values) => {
      // console.log(values)
      values.description = description
      values.skills = selectedSkills.map((skill) => skill.value) as never[];
      handleCreateWorkExperience(values as IWorkExperience)
    }
  })

  const workTypeOptions = [
    { value: "On-site", label: "On-site" },
    { value: "Hybrid", label: "Hybrid" },
    { value: "Remote", label: "Remote" },
  ]

  const employmentTypeOptions = [
    { value: "Full Time", label: "Full Time" },
    { value: "Part Time", label: "Part Time" }
  ]

  const handleChangeWorkType = (option: any) => {
    setWorkType(option)
    setFieldValue("workType", option.value)
  }
  const handleChangeEmploymentType = (option: any) => {
    setEmploymentType(option)
    setFieldValue("employmentType", option.value)
  }

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
      <ModalHeader className={'app_modal_header'} close={closeBtn} toggle={toggle}>Add Work Experience</ModalHeader>
      <form onSubmit={handleSubmit} method='POST' >
        <ModalBody className={'app_modal_body'}>
          <div className={styles.form_group}>
            <label>Job Title / Position</label>
            <input type="text"
              name='title'
              value={values.title}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.title && <small className='form-error-feedback'>{errors.title}</small>}
          </div>
          <div className={styles.form_group}>
            <label>Company / Organization</label>
            <input type="text"
              name='company'
              value={values.company}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.company && <small className='form-error-feedback'>{errors.company}</small>}
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
              closeMenuOnSelect={false}
              value={selectedSkills}
              styles={customStyle}
              placeholder=""

            />

          </div>
          <div className='d-flex gap-5'>
            <div className={styles.form_group}>
              <label>State</label>
              <input type="text"
                name='state'
                value={values.state}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.state && <small className='form-error-feedback'>{errors.state}</small>}
            </div>
            <div className={`position-relative ${styles.form_group}`}>
              <label>
                Country
              </label>
              <input type="text"
                name='country'
                value={values.country}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.country && <small className='form-error-feedback'>{errors.country}</small>}

            </div>
          </div>



          <div className='d-flex gap-5'>
            <div className={`flex-2 ${styles.form_group}`}>
              <label>Work Type</label>
              <Select
                options={workTypeOptions}
                name='workType'
                onChange={handleChangeWorkType}
                classNamePrefix='select'
                value={workType}
                styles={customStyle}
                placeholder=""
              />
              {errors.workType && <small className='form-error-feedback'>{errors.workType}</small>}
            </div>
            <div className={`position-relative flex-2 ${styles.form_group}`}>
              <label>
                Employment Type
              </label>
              <Select
                options={employmentTypeOptions}
                name='employmentType'
                onChange={handleChangeEmploymentType}
                classNamePrefix='select'
                value={employmentType}
                styles={customStyle}
                placeholder=""
              />
              {errors.employmentType && <small className='form-error-feedback'>{errors.employmentType}</small>}

            </div>
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
              {errors.startDate && <small className='form-error-feedback'>{errors.startDate}</small>}
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
                disabled={values.stillWorkingHere}
              />
              {errors.endDate && <small className='form-error-feedback'>{errors.endDate}</small>}
              <div className={styles.end_date_non}>
                <input type="checkbox" checked={values.stillWorkingHere} name="stillWorkingHere" id="stillWorkingHere" onChange={handleChange} />
                <label htmlFor="stillWorkingHere">Still Working here?</label>
              </div>
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
            {isCreatingWorkExperience ? <Spinner>Loading...</Spinner> : "Save"}

          </button>
        </ModalFooter>
      </form>
    </Modal>
  )
}

export default AddWorkExperienceModal