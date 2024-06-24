'use client'
import React, { useEffect, useState } from 'react'
import styles from '../../Styles/_resetPassword.module.scss'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { toast } from 'sonner'
import { ProfileService } from '@/app/api/profileService'
// import { useRouter } from 'next/router'
import { Spinner } from 'reactstrap'
import { useParams, useRouter } from 'next/navigation'


const ResetPassword = () => {
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [isLinkInvalid, setIsLinkInvalid] = useState(false)
  const [checked, setChecked] = useState(false)

  const router = useRouter()
  const { token } = useParams()

  const initialValues = {
    password: '',
    confirmPassword: ''
  }

  const validationSchema = Yup.object({
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match')
  })

  const { values, errors, setFieldValue, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: values => {
      // console.log('Form Two values:', values);
      handleResetPassword(values)
    }
  })

  const handleResetPassword = async (values: any) => {
    try {
      setIsChangingPassword(true)
      await ProfileService.ResetPassword(values, token as string)
      toast.success("Password changed successfully")
      router.push("/login")
    } catch (error) {
      // console.log(error)
      toast.error("Something went wrong changing password. Try again!")
    } finally {
      setIsChangingPassword(false)
    }
  }

  const checkLinkValidity = async () => {
    try {
      await ProfileService.CheckResetPasswordLink(token as string)
      setIsLinkInvalid(false)
    } catch (error) {
      setIsLinkInvalid(true)
    } finally {
      setChecked(true)
    }
  }

  useEffect(() => {
    checkLinkValidity()
  }, [])
  return (
    <>
      {
        checked &&
        <>
          {
            isLinkInvalid ?
              <h2 className="text-center mt-4">Link EXPIRED or INVALID</h2> :
              <div className={styles.resetPassword}>
                <form onSubmit={handleSubmit} method='POST'>
                  <div className={styles.form_group}>
                    <label>Password</label>
                    <input type="password"
                      name="password"
                      value={values.password}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      onInput={handleChange}
                    />
                    {errors.password && <small className='form-error-feedback'>{errors.password}</small>}
                  </div>
                  <div className={styles.form_group}>
                    <label>Confirm Password</label>
                    <input type="password"
                      name="confirmPassword"
                      value={values.confirmPassword}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      onInput={handleChange}
                    />
                    {errors.confirmPassword && <small className='form-error-feedback'>{errors.confirmPassword}</small>}
                  </div>
                  <button type='submit'>{isChangingPassword ? <Spinner>Loading...</Spinner> : "Submit"}</button>
                </form>
              </div>
          }
        </>
      }
    </>
  )
}

export default ResetPassword