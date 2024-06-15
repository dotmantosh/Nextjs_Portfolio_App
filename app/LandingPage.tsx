'use client'
import React, { useEffect, useState } from 'react'
import styles from './Styles/_landing.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { Spinner } from 'reactstrap'

import { useFormik } from 'formik'
import * as yup from 'yup'
import { toast } from 'sonner'
import { ProfileService } from './api/profileService'
import { error } from 'console'

const initial = [
  {
    id: 0,
    text: "Welcome to our platform, where developers like you can curate their professional journey with ease. Build your portfolio, showcase your projects, and highlight your expertise—all in one secure space. Take the next step in your career today."
  },
  {
    id: 1,
    text: "Save, share your portfolios and connect with potential employers."
  }
]
function LandingPage() {
  const [isSending, setIsSending] = useState(false)

  const initialValues = {
    email: '',
    name: '',
    message: ''
  }

  const formValidation = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Please enter a valid email").required("Email is required"),
    message: yup.string().required("Message is required")
  })

  const handleSendContactUsMessage = async (values: any) => {
    try {
      setIsSending(true)
      await ProfileService.SendContactUs(values)
      resetForm()
      toast.success("Message sent successfully")
    } catch (error) {
      toast.error("Something went wrong when sending message. Try again!")
    } finally {
      setIsSending(false)
    }
  }

  const { values, errors, handleBlur, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues,
    validationSchema: formValidation,
    onSubmit: async (values) => {
      handleSendContactUsMessage(values)
    }
  })

  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0)
  const interval = 10000

  useEffect(() => {
    const paragraphInterval = setInterval(() => {
      setCurrentParagraphIndex(currentIndex => (currentIndex + 1) % initial.length)
    }, interval)

    return () => clearInterval(paragraphInterval)
  }, [])
  return (
    <>
      <section id="home" className={styles.hero}>
        <div className={`container ${styles.hero_wrapper}`}>
          <div className={styles.hero_left}>
            <h1>
              Showcase Your Talent, <br /> Secure Your Future.
            </h1>
            <p>
              {initial[currentParagraphIndex].text}
            </p>

            <Link href="/signup">Get Started</Link>
          </div>
          <div className={styles.hero_right}>
            <Image src="https://user-images.githubusercontent.com/49222186/110210369-58458c80-7eb7-11eb-9d6e-2129358b3098.png" alt='img' fill />
          </div>
        </div>
      </section>

      <section id="about" className={styles.about}>
        <h2>Our Mission</h2>
        <p>
          At DevsFolio, we're dedicated to empowering developers present their skills and experiences effectively. Our mission is to provide a seamless platform for professionals to share their portfolios and connect with potential employers. Whether you're a seasoned developer or just starting out, we're here to support your journey towards success. Join us and take control of your career narrative
        </p>
      </section>

      <section id="contact" className={styles.contact}>
        <div className={`container ${styles.contact_wrapper}`}>
          <div className={styles.contact_left}>
            <h1>Get in touch with us</h1>
            <p>
              We're here to listen you with suggestions, feedback, or inquiries about our platform, feel free to reach out to us. <br /> <br /> Our team is dedicated to providing you with the best service you need. Simply fill out the form below or use the contact details provided, and we'll get back to you as soon as possible.
            </p>
          </div>
          <div className={styles.contact_right}>
            <form onSubmit={handleSubmit}>
              <div className={styles.form_group}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id='name'
                  name='name'
                  placeholder='Name'
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.name && <small className='form-error-feedback'>{errors.name}</small>}
              </div>
              <div className={styles.form_group}>
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id='email'
                  name='email'
                  placeholder='Email'
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && <small className='form-error-feedback'>{errors.email}</small>}
              </div>
              <div className={styles.form_group}>
                <label htmlFor="message">Message</label>
                <textarea onChange={handleChange} onBlur={handleBlur} name="message" id="message" placeholder='Message' value={values.message}>
                </textarea>
                {errors.message && <small className='form-error-feedback'>{errors.message}</small>}
              </div>
              <button type="submit">{isSending ? <Spinner>Loading...</Spinner> : 'Send'} </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default LandingPage