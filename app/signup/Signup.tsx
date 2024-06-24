'use client'
import React, { useState } from 'react'
import styles from '../Styles/_signup.module.scss'
import Link from 'next/link'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { AuthService } from '../api/authService'
import { IUserSignUpRequest } from '../interfaces/Iuser'
import { Spinner } from 'reactstrap'
import { toast } from 'sonner'

import { useRouter } from 'next/navigation'

const initialValues = {
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const signUpValidation = Yup.object({
  username: Yup.string().min(4).required("Please enter a username"),
  email: Yup.string().email("Please enter a valid email").required("Email is required"),
  password: Yup.string().min(6).required("Please enter password"),
  confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Password not matched")
})

function SignUp() {
  const [isLoading, setIsLoading] = useState(false)

  const { values, errors, handleBlur, handleChange, handleSubmit, } = useFormik({
    initialValues: initialValues,
    validationSchema: signUpValidation,
    onSubmit: (values) => {
      signUpUser(values)
    }
  })
  const router = useRouter()

  const signUpUser = async (values: IUserSignUpRequest) => {
    try {
      setIsLoading(true)
      const res = await AuthService.SignUpUser(values)
      // console.log(res.data)
      toast.success("SignUp successful")
      router.push("/login")
    } catch (error: any) {
      // console.log(error)
      if (error.message) {
        toast.error(error.message)
      } else if (error.response?.status === 400) {
        toast.error(error.response?.data?.message)
      } else {
        toast.error("Something went wrong")
      }

    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className={styles.signup}>
      <div className={styles.signup_wrapper}>
        <div className={styles.signup_content}>
          <div className={styles.signup_top}>
            <h1>Sign Up</h1>
          </div>
          <form onSubmit={handleSubmit} className={styles.signup_form}>
            <p>Already have an account? , <Link href={"/login"}>Login</Link></p>
            <div className={styles.form_group}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                placeholder='Enter Username'
                name="username"
                value={values.username}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.username && <small>{errors.username}</small>}
            </div>
            <div className={styles.form_group}>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                placeholder='Enter Email'
                name="email"
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.email && <small>{errors.email}</small>}
            </div>
            <div className={styles.form_group}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder='Enter Password'
                name="password"
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange} />
              {errors.password && <small>{errors.password}</small>}
            </div>
            <div className={styles.form_group}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" placeholder='Enter Confirm Password' name="confirmPassword" value={values.confirmPassword}
                onBlur={handleBlur}
                onChange={handleChange} />
              {errors.confirmPassword && <small>{errors.confirmPassword}</small>}
            </div>


            <button type="submit" disabled={isLoading} className={styles.form_button}>{isLoading ? <Spinner color='#cccccc'>Loading...</Spinner> : "Submit"} </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp