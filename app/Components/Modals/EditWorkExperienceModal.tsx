import { IWorkExperience } from '@/app/interfaces/IWorkExperience';
import React, { useEffect, useMemo, useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap';
import * as Yup from 'yup'
import styles from '../../Styles/_workExperience.module.scss'
import { useFormik } from 'formik';
import Image from 'next/image';
import { AddPhotoIcon } from '@/public/imgs/images'
import dynamic from 'next/dynamic'
import moment from 'moment';
import Select from 'react-select'
import { customStyle } from '@/app/helpers/selectStyles';
import { ProfileService } from '@/app/api/profileService';
import { ISkill } from '@/app/interfaces/ISkill';
import { toast } from 'sonner';

interface EditModalProps {
  isUpdatingWorkExperience: boolean
  selectedWorkExperience: IWorkExperience
  handleUpdateWorkExperience: (values: IWorkExperience) => void
  isModalOpen: boolean
  toggle: () => void
  closeBtn: React.ReactElement<HTMLButtonElement>;
}

interface IOptions {
  label: string,
  value: string,
}


const InitialValues: IWorkExperience = {
  title: "",
  company: "",
  description: "",
  startDate: "",
  state: "",
  country: "",
  endDate: "",
  workType: "",
  skills: [],
  employmentType: "",
  stillWorkingHere: false
}

const EditWorkExperienceModal = ({ selectedWorkExperience, isUpdatingWorkExperience, handleUpdateWorkExperience, isModalOpen, toggle, closeBtn }: EditModalProps) => {
  const [description, setDescription] = useState("")
  const [windowReady, setWindowReady] = useState(false)
  const [workType, setWorkType] = useState<IOptions>()
  const [employmentType, setEmploymentType] = useState<IOptions>()
  const [skillsOptions, setSkillsOptions] = useState<IOptions[]>()
  const [selectedSkills, setSelectedSkills] = useState<IOptions[]>([])
  const [initialValues, setInitialValues] = useState<IWorkExperience>(selectedWorkExperience || InitialValues)
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);



  const workExperienceValidation = Yup.object().shape({
    stillWorking: Yup.boolean(),
    title: Yup.string().required("School is required"),
    company: Yup.string().required("Work type is required"),
    workType: Yup.string().required("Course is required"),
    startDate: Yup.date().required("Start Date is required"),
    endDate: Yup.date().when('stillWorkingHere', (stillWorkingHere, schema) => {
      return stillWorkingHere ? schema : schema.required("End Date is required");
    }),
  });

  const { values, errors, setFieldValue, handleBlur, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: selectedWorkExperience,
    validationSchema: workExperienceValidation,
    onSubmit: async (values) => {
      // console.log(values)
      values.description = description
      values.skills = selectedSkills.map((skill) => skill.value);
      handleUpdateWorkExperience(values as IWorkExperience)
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

  const handleChangeStillWorkingHere = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    if (checked) {
      setFieldValue('endDate', ''); // Reset endDate value if stillWorkingHere is checked
    }
    handleChange(event); // Handle change for stillWorkingHere
  };

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
    setInitialValues(selectedWorkExperience)
    // console.log(initialValues)
    // console.log(values)
    // console.log(selectedWorkExperience)
    setDescription(selectedWorkExperience.description)
    if (selectedWorkExperience.workType?.length) {
      const selectedWorkType: IOptions = { value: selectedWorkExperience.workType, label: selectedWorkExperience.workType }
      setWorkType(selectedWorkType)
    }
    if (selectedWorkExperience.employmentType?.length) {
      const selectedEmploymentType: IOptions = { value: selectedWorkExperience.employmentType, label: selectedWorkExperience.employmentType }
      setEmploymentType(selectedEmploymentType)
    }
    setSelectedSkills(selectedWorkExperience && selectedWorkExperience.populatedSkills && selectedWorkExperience.populatedSkills.map((skill) => ({ value: skill._id as string, label: skill.name as string })) || [])
    resetForm({ values: selectedWorkExperience })
  }, [selectedWorkExperience])
  useEffect(() => {
    fetchSkills()
  }, [])
  return (
    <>
      {selectedWorkExperience &&
        <Modal
          contentClassName={'app_modal_content'}
          className={'app_modal'}
          centered isOpen={isModalOpen}
          size='md'
          toggle={toggle}>
          <ModalHeader className={'app_modal_header'} close={closeBtn} toggle={toggle}>Edit Work Experience</ModalHeader>
          <form method='POST' onSubmit={handleSubmit}>
            <ModalBody className={'app_modal_body'}>
              <div className={styles.form_group}>
                <label>Job Title / Position</label>
                <input type="text"
                  name='title'
                  value={values?.title}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.title && <small className='form-error-feedback'>{errors.title}</small>}
              </div>
              <div className={styles.form_group}>
                <label>Company / Organization</label>
                <input type="text"
                  name='company'
                  value={values?.company}
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
                  onChange={(selectedOptions) => setSelectedSkills(selectedOptions as IOptions[])}
                  className='app_select'
                  classNamePrefix='select'
                  value={selectedSkills}
                  closeMenuOnSelect={false}
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
                    value={moment(values.startDate).format('YYYY-MM-DD')}
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
                    value={moment(values.endDate).format('YYYY-MM-DD')}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    disabled={values.stillWorkingHere}
                  />
                  {errors.endDate && <small className='form-error-feedback'>{errors.endDate}</small>}
                  <div className={styles.end_date_non}>
                    <input type="checkbox" checked={values.stillWorkingHere} name="stillWorkingHere" id="stillWorkingHere" onChange={handleChangeStillWorkingHere} />
                    <label htmlFor="stillWorkingHere">Still Working here?</label>
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
                {
                  isUpdatingWorkExperience ? <Spinner>Loading...</Spinner>
                    :
                    "Save"
                }

              </button>
            </ModalFooter>
          </form>
        </Modal>
      }
    </>
  )
}

export default EditWorkExperienceModal