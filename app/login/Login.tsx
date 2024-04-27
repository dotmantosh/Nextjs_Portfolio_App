'use client'
import React, { useState } from 'react'
import styles from '../Styles/_signup.module.scss'
import Link from 'next/link'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { error } from 'console'
import { signIn, useSession, getSession } from 'next-auth/react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Spinner } from 'reactstrap'

const initialValues = {
  email: '',
  password: '',
}

const loginValidation = Yup.object({
  email: Yup.string().email("Please enter a valid email").required("Email is required"),
  password: Yup.string().min(6).required("Please enter password"),
})


function Login() {
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)

  // const { mutate } = useSession();
  const router = useRouter();

  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: loginValidation,
    onSubmit: async (values) => {
      try {
        setIsLoading(true)
        const response = await signIn('credentials', {
          email: values.email,
          password: values.password,
          redirect: false
        })
        console.log(response);
        if (response?.error) {
          toast.error("Invalid Credentials")
        }
        toast.success("login successful")
        // mutate()
        const session = await getSession();
        router.push(`/profile/${session?.user?.username}`)
        setIsLoading(false)
      } catch (error) {
        toast.error("Something went wrong!")
        console.log(error)
        setIsLoading(false)
      }
    }
  })
  return (
    <div className={styles.signup}>
      <div className={styles.signup_wrapper}>
        <div className={styles.signup_content}>
          <div className={styles.signup_top}>
            <h1>Welcome Back 🖐✋, Login</h1>
          </div>
          <form onSubmit={handleSubmit} method='POST' className={styles.signup_form}>
            <p>Don't have an account? , <Link href={"/signup"}>Sign up</Link></p>

            <div className={styles.form_group}>
              <label htmlFor="email">Email</label>
              <input type="text" placeholder='Enter Email'
                name="email"
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange} />
              {errors.email && <small>{errors.email}</small>}

            </div>
            <div className={styles.form_group}>
              <label htmlFor="password">Password</label>
              <input type="password" placeholder='Enter Password'
                name="password"
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange} />
              <span><small>{errors.password && errors.password}</small> forgot password?</span>
            </div>


            <button type="submit" disabled={isLoading} className={styles.form_button}>
              {isLoading ? <Spinner></Spinner> : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login