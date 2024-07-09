'use client'
import React, { useState } from 'react'
import styles from '../Styles/_resetPassword.module.scss'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { toast } from 'sonner'
import { ProfileService } from '@/app/api/profileService'
// import { useRouter } from 'next/router'
import { Spinner } from 'reactstrap'
import { useParams, useRouter } from 'next/navigation'

const ForgotPassword = () => {
  const [isSendingEmail, setIsSendingEmail] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const router = useRouter()

  const initialValues = {
    email: '',
  }

  const educationValidation = Yup.object().shape({
    email: Yup.string().email().required()
  });

  const { values, errors, setFieldValue, setErrors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: educationValidation,
    onSubmit: async (values) => {
      // console.log(values)
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
    } catch (error: any) {
      if (error.response.status === 404) {
        setErrors({ email: "Email Address not found. Please Sign up" })
      }
      toast.error("Something went wrong, could not send Email")
    } finally {
      setIsSendingEmail(false)
    }
  }
  return (
    <>
      <h2 className="text-center mt-4">Forgot Password</h2>
      <div className={styles.resetPassword}>
        <form onSubmit={handleSubmit} method='POST'>
          <div className={styles.form_group}>
            <label>Enter Your Email</label>
            <input type="text"
              name="email"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              onInput={handleChange}
            />
            {errors.email && <small className='form-error-feedback'>{errors.email}</small>}
          </div>

          <button type='submit'>{isSendingEmail ? <Spinner>Loading...</Spinner> : "Submit"}</button>

          {emailSent && <span style={{ color: "#018c0f", marginTop: "20px", display: "block" }}>A Reset Password Link has been sent to {values.email}. Please check your email and Follow the link </span>}
        </form>
      </div>
    </>
  )
}

export default ForgotPassword