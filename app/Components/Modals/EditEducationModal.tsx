import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap'
import * as Yup from 'yup'
import styles from '../../Styles/_workExperience.module.scss'
import { IEducation } from '@/app/interfaces/IEducation'
import moment from 'moment'
import Select from 'react-select'
import { customStyle } from '@/app/helpers/selectStyles'

interface EditModalProps {
  selectedEducation: IEducation
  handleUpdateEducation: (values: IEducation) => void
  isModalOpen: boolean
  isUpdatingEducation: boolean
  toggle: () => void
  closeBtn: React.ReactElement<HTMLButtonElement>;
}

interface IOptionProp {
  label: string,
  value: string
}

const InitialValues = {
  qualification: "",
  school: "",
  city: "",
  state: "",
  country: "",
  startDate: "",
  endDate: "",
  programType: "",
  stillSchooling: false
}


const EditEducationModal = ({ selectedEducation, handleUpdateEducation, isUpdatingEducation, isModalOpen, toggle, closeBtn }: EditModalProps) => {

  const [initialValues, setInitialValues] = useState<IEducation>(selectedEducation || InitialValues)
  // console.log(initialValues)

  const [programType, setProgramType] = useState<IOptionProp>()

  const educationValidation = Yup.object().shape({
    stillSchooling: Yup.boolean(),
    school: Yup.string().required("School is required"),
    qualification: Yup.string().required("Qualificaition is required"),
    startDate: Yup.date().required("Start Date is required"),
    endDate: Yup.date().when('stillSchooling', (stillSchooling, schema) => {
      return stillSchooling ? schema : schema.required("End Date is required");
    }),
  });

  const { values, errors, setFieldValue, handleBlur, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: selectedEducation,
    validationSchema: educationValidation,
    onSubmit: async (values) => {
      console.log(values)
      handleUpdateEducation(values as IEducation)
      // console.log(errors)
    }
  })
  const programTypeOptions: IOptionProp[] = [
    { value: "Full Time", label: "Full Time" },
    { value: "Part Time", label: "Part Time" }
  ]
  const handleStillSchoolingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    if (checked) {
      setFieldValue('endDate', ''); // Reset endDate value if stillWorkingHere is checked
    }
    handleChange(event); // Handle change for stillWorkingHere
  };

  const handleProgramTypeChange = (option: any) => {
    // console.log(value)
    setProgramType(option)
    setFieldValue("programType", option.value)
  }

  // console.log(values)
  useEffect(() => {
    setInitialValues(selectedEducation)
    // console.log(initialValues)
    // console.log(values)
    // console.log(selectedEducation)

    setProgramType({ value: selectedEducation.programType, label: selectedEducation.programType })
    resetForm({ values: selectedEducation })
  }, [selectedEducation])
  return (
    <>
      {
        selectedEducation &&
        <Modal
          contentClassName={'app_modal_content'}
          className={'app_modal'}
          centered isOpen={isModalOpen}
          size='md'
          toggle={toggle}>
          <ModalHeader className={'app_modal_header'} close={closeBtn} toggle={toggle}>Edit Education</ModalHeader>
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
                {errors.qualification && <small className='form-error-feedback'>{errors.qualification}</small>}
              </div>
              <div className={styles.form_group}>
                <label>School</label>
                <input type="text"
                  name="school"
                  value={values.school}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.school && <small className='form-error-feedback'>{errors.school}</small>}
              </div>
              <div className='d-flex gap-5'>
                <div className={styles.form_group}>
                  <label>City</label>
                  <input type="text"
                    name="city"
                    value={values.city as string}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {errors.city && <small className='form-error-feedback'>{errors.city}</small>}
                </div>
                <div className={`position-relative ${styles.form_group}`}>
                  <label>
                    State
                  </label>
                  <input type="text"
                    name="state"
                    value={values.state as string}
                    onBlur={handleBlur}
                    onChange={handleChange}

                  />
                  {errors.state && <small className='form-error-feedback'>{errors.state}</small>}

                </div>
              </div>
              <div className='d-flex gap-5'>
                <div className={`flex-2 ${styles.form_group}`}>
                  <label>Country</label>
                  <input type="text"
                    name="country"
                    value={values.country}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {errors.country && <small className='form-error-feedback'>{errors.country}</small>}
                </div>
                <div className={`position-relative flex-2 ${styles.form_group}`}>
                  <label>
                    Program Type
                  </label>
                  <Select
                    options={programTypeOptions}
                    name='programType'
                    onChange={handleProgramTypeChange}
                    className='app_select'
                    classNamePrefix='select'
                    value={programType}
                    styles={customStyle}
                    placeholder=""
                  />
                  {/* <input type="text"
                name="programType"
                value={values.programType}
                onBlur={handleBlur}
                onChange={handleChange}
              /> */}
                  {errors.programType && <small className='form-error-feedback'>{errors.programType}</small>}

                </div>
              </div>
              <div className='d-flex gap-5'>
                <div className={styles.form_group}>
                  <label>Start Date</label>
                  <input type="date"
                    name="startDate"
                    value={moment(values.startDate as string).format('YYYY-MM-DD')}
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
                    name="endDate"
                    value={moment(values.endDate as string).format('YYYY-MM-DD') || ""}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    disabled={values?.stillSchooling}
                  />
                  {errors.endDate && <small className='form-error-feedback'>{errors.endDate}</small>}
                  <div className={styles.end_date_non}>
                    <input name="stillSchooling" checked={values.stillSchooling} type="checkbox" id="stillSchooling" onChange={handleStillSchoolingChange} />
                    <label htmlFor="stillSchooling">Still Schooling?</label>
                  </div>
                </div>
              </div>
              {/* <div className={styles.form_group}>
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
              </div> */}
            </ModalBody>
            <ModalFooter className={'app_modal_footer'}>
              <button className='app_modal_cancel' onClick={toggle}>
                Cancel
              </button>{' '}
              <button type='submit' className='app_modal_save'>
                {
                  isUpdatingEducation ? <Spinner>Loading...</Spinner> : "Save"
                }

              </button>
            </ModalFooter>
          </form>
        </Modal>
      }
    </>
  )
}

export default EditEducationModal