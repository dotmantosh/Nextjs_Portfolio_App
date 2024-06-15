import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import * as Yup from 'yup'
import styles from '../../Styles/_workExperience.module.scss'
import { IEducation } from '@/app/interfaces/IEducation'
import Select from 'react-select'
import { customStyle } from '@/app/helpers/selectStyles'
import { toast } from 'sonner'
import { ProfileService } from '@/app/api/profileService'

interface AddModalProps {
  // handleForgotPassword: (values: {email: string}) => void
  isModalOpen: boolean
  toggle: () => void
  closeBtn: React.ReactElement<HTMLButtonElement>;
}
const ForgotPasswordModal = ({ isModalOpen, toggle, closeBtn }: AddModalProps) => {
  const [isSendingEmail, setIsSendingEmail] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const initialValues = {
    email: '',
  }

  const educationValidation = Yup.object().shape({
    email: Yup.string().email().required()
  });

  const { values, errors, setFieldValue, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: educationValidation,
    onSubmit: async (values) => {
      console.log(values)
      handleForgotPassword(values)
      // console.log(errors)
    }
  })

  const handleForgotPassword = async (value: { email: string }) => {
    try {
      setEmailSent(false)
      setIsSendingEmail(true)
      await ProfileService.SendResetEmail(value)
      toast.success("Reset url sent successfully")
      setEmailSent(true)
    } catch (error) {
      toast.error("Something went wrong, could not send Email")
    } finally {
      setIsSendingEmail(false)
    }
  }
  return (
    <Modal
      contentClassName={'app_modal_content'}
      className={'app_modal'}
      centered isOpen={isModalOpen}
      size='md'
      toggle={toggle}>
      <ModalHeader className={'app_modal_header'} close={closeBtn} toggle={toggle}>Forgot Password</ModalHeader>
      <form onSubmit={handleSubmit} method='POST'>

        <ModalBody className={'app_modal_body'}>
          <h4 className='text-center mb-4'>Input Registration Email</h4>

          <div className={styles.form_group}>
            <label>Email</label>
            <input type="text"
              name="email"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              onInput={handleChange}
            />
            {errors.email && <small className='form-error-feedback'>{errors.email}</small>}
          </div>

          {emailSent && <span style={{ color: "#018c0f" }}>A Reset Password Link has been sent to {values.email}. Please go to your email and Follow the link </span>}

        </ModalBody>
        <ModalFooter className={'app_modal_footer'}>
          <button className='app_modal_cancel' onClick={toggle}>
            Cancel
          </button>{' '}
          <button type='submit' className='app_modal_save'>
            Submit
          </button>
        </ModalFooter>
      </form>
    </Modal>
  )
}

export default ForgotPasswordModal