'use client'
import React, { useState } from 'react'
import styles from '../Styles/_account.module.scss'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { AddPhotoIcon } from '@/public/imgs/images'
import Image from 'next/image'

function Account() {
  const [isAccountEdit, setIsAccountEdit] = useState(false)
  const [isPasswordEdit, setIsPasswordEdit] = useState(false)
  const [photo, setPhoto] = useState<string>()
  const [photoErrorMsg, setPhotoErrorMsg] = useState<string>()
  const [imgUrl, setImgUrl] = useState<string>()

  const formOne = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      state: '',
      country: '',
      about: ''
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First Name is required'),
      lastName: Yup.string().required('Last Name is required'),
      about: Yup.string()
      // about: Yup.string()
    }),
    onSubmit: values => {
      console.log('Form One values:', values);
    },
  });

  const formTwo = useFormik({
    initialValues: {
      password: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      password: Yup.string().required('Password is required'),
      newPassword: Yup.string().required('New Password is required'),
      confirmPassword: Yup.string()
        .required('Confirm Password is required')
        .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    }),
    onSubmit: values => {
      console.log('Form Two values:', values);
    },
  });

  const handleFileUpload = (e: any) => {
    // Get the selected file
    const selectedFile: File = e.target.files[0];
    console.log('File: ', selectedFile)
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
            const base64String = base64URL.split(',')[1];

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
    console.log(imgUrl)
  };

  return (
    <section>
      <h3 className='app-heading'>Account</h3>

      <div className={styles.account_wrapper}>
        <div className={styles.account_top}>
          <div className={styles.account_identity}>
            <div className={styles.account_profile_pic}>
              {imgUrl ? <Image src={imgUrl} alt='img' className={styles.imgUrl} fill /> : <Image src={AddPhotoIcon} alt='img' className='add_image_icon' />}

            </div>
            <div className={styles.account_name}>
              <h4>Omotosho Oyedotun</h4>
              <label>
                <input type="file" onChange={handleFileUpload} />
                Change Profile Picture
              </label>
            </div>
          </div>

          <form onSubmit={formOne.handleSubmit} className={styles.account_info}>
            <div className='d-flex gap-5'>
              <div className={styles.form_group}>
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder='Enter First Name'
                  value={formOne.values.firstName}
                  readOnly={!isAccountEdit}
                  onChange={formOne.handleChange}
                  onBlur={formOne.handleBlur}
                />
                {formOne.errors.firstName && <small>{formOne.errors.firstName}</small>}
              </div>
              <div className={styles.form_group}>
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder='Enter Last Name'
                  value={formOne.values.lastName}
                  readOnly={!isAccountEdit}
                  onChange={formOne.handleChange}
                  onBlur={formOne.handleBlur}
                />
                {formOne.errors.lastName && <small>{formOne.errors.lastName}</small>}
              </div>
            </div>
            <div className='d-flex gap-5'>
              <div className={styles.form_group}>
                <label>Email</label>
                <input type="text" readOnly />
              </div>
              <div className={styles.form_group}>
                <label>Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder='Enter Phone Number'
                  readOnly={!isAccountEdit}
                  value={formOne.values.phoneNumber}
                  onChange={formOne.handleChange}
                  onBlur={formOne.handleBlur}
                />

              </div>
            </div>
            <div className='d-flex gap-5'>
              <div className={styles.form_group}>
                <label>State</label>
                <input type="text" name="state"
                  placeholder='Enter State' readOnly={!isAccountEdit}
                  value={formOne.values.state}
                  onChange={formOne.handleChange}
                  onBlur={formOne.handleBlur} />
              </div>
              <div className={styles.form_group}>
                <label>Phone Number</label>
                <input
                  type="text"
                  name="Country"
                  placeholder='Enter Country'
                  readOnly={!isAccountEdit}
                  value={formOne.values.country}
                  onChange={formOne.handleChange}
                  onBlur={formOne.handleBlur}
                />

              </div>
            </div>
            <div className={styles.form_group}>
              <label>About</label>
              <textarea onChange={formOne.handleChange} name="about" id="about" readOnly={!isAccountEdit} value={formOne.values.about} placeholder='Enter short intro about yourself'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores inventore cumque non odit nemo. Ipsa in delectus, veritatis earum similique provident fuga, illum harum quibusdam facere vitae dolores, excepturi aperiam.
              </textarea>
            </div>
            {
              isAccountEdit ?
                <div className={styles.edit_actions}>
                  <span onClick={() => setIsAccountEdit(false)}>Cancel</span>
                  <button>Submit</button>
                </div> :
                <span onClick={() => setIsAccountEdit(true)} className={styles.edit_btn}>Edit</span>
            }
          </form>
          {/* <div className={styles.about}>
            <h6>About</h6>
            About Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo illum saepe expedita dignissimos odit commodi voluptatem ab vitae distinctio, ipsa nesciunt eaque cum aliquid aliquam suscipit non, dolorem sint a?
          </div> */}
        </div>


        <form onSubmit={formTwo.handleSubmit} className={styles.account_bottom}>
          <div >
            <div className={styles.form_group}>
              <h6>Current Password</h6>
              <input type="password" readOnly={!isPasswordEdit} placeholder={isPasswordEdit ? 'Enter Password' : '***********'} onChange={formTwo.handleChange} onBlur={formTwo.handleBlur} value={formTwo.values.password} />

            </div>
            {
              isPasswordEdit &&
              <div className='d-flex gap-5'>
                <div className={styles.form_group}>
                  <label>New Password</label>
                  <input type="password" placeholder='Enter New Password' onChange={formTwo.handleChange} onBlur={formTwo.handleBlur} value={formTwo.values.newPassword} />
                </div>
                <div className={styles.form_group}>
                  <label>Confirm Password</label>
                  <input type="password" placeholder='Enter Confirm Password' onChange={formTwo.handleChange} onBlur={formTwo.handleBlur} value={formTwo.values.confirmPassword} />
                </div>
              </div>
            }
          </div>
          {
            isPasswordEdit ?
              <div className={styles.edit_actions}>
                <span onClick={() => setIsPasswordEdit(false)}>Cancel</span>
                <button type='submit'>Submit</button>
              </div> :
              <span onClick={() => setIsPasswordEdit(true)} className={styles.edit_btn}>Edit</span>
          }
        </form>
      </div>
    </section>
  )
}

export default Account