'use client'
import React, { useEffect, useState } from 'react'
import styles from '../../Styles/_account.module.scss'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { AddPhotoIcon } from '@/public/imgs/images'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { ProfileService } from '@/app/api/profileService'
import { toast } from 'sonner'
import { IProfile } from '@/app/interfaces/IProfile'
import { Input, Spinner, FormGroup } from 'reactstrap'
import DeleteModal from '@/app/Components/Modals/DeleteModal'
import { CopyIcon } from '@/app/Components/SVGs/SVGIcons'

function Account() {
  const [isAccountEdit, setIsAccountEdit] = useState(false)
  const [isSocialEdit, setIsSocialEdit] = useState(false)
  const [isPasswordEdit, setIsPasswordEdit] = useState(false)
  const [isSettingsEdit, setIsSettingsEdit] = useState(false)
  const [photo, setPhoto] = useState<string>()
  const [resume, setResume] = useState<string>()
  const [photoErrorMsg, setPhotoErrorMsg] = useState<string>()
  const [resumeErrorMsg, setResumeErrorMsg] = useState<string>()
  const [email, setEmail] = useState("")
  const [imgUrl, setImgUrl] = useState<string>()
  const [profile, setProfile] = useState<IProfile>()
  const [isCreatingProfile, setIsCreatingProfile] = useState(false)
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [isFetchingProfile, setIsFetchingProfile] = useState(false)
  const [isUpdatingResume, setIsUpdatingResume] = useState(false)
  const [isRemovingResume, setIsRemovingResume] = useState(false)
  const [isUpdatingProfilePicture, setIsUpdatingProfilePicture] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const pathname = usePathname()
  const [hostname, setHostname] = useState('')

  const { data: session } = useSession()

  const handleCopyClick = () => {
    const url = `https://${hostname}/public/${session?.user.username}`;
    navigator.clipboard.writeText(url).then(() => {
      toast.success("URL copied to clipboard");
    }).catch(err => {
      toast.error("Failed to copy URL");
    });
  };

  const handleCreateProfile = async (values: any) => {
    try {
      if (values.photo?.length > 0) { setIsUpdatingProfilePicture(true) }
      if (values.resume?.length > 0) { setIsUpdatingResume(true) }
      setIsCreatingProfile(true)
      await ProfileService.CreateUserProfile(values, session?.user.token as string)
      const isOnlyPhotoPresentInValues = Object.keys(values).length === 1 && Object.keys(values)[0] === "photo"
      isOnlyPhotoPresentInValues ? toast.success("Profile Picture Updated Successfully") : toast.success("Profile Updated successfully")
      setIsAccountEdit(false)
      fetchUserProfile()
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong fetching User Information. Try again!")
    } finally {
      if (photo) setIsUpdatingProfilePicture(false)
      if (resume) setIsUpdatingResume(false)
      setIsCreatingProfile(false)
    }
  }
  const handleUpdateProfile = async (values: any) => {
    try {
      if (values.photo?.length) { setIsUpdatingProfilePicture(true) }
      if (values.resume?.length) { setIsUpdatingResume(true) }
      setIsUpdatingProfile(true)
      values._id = profile?._id
      await ProfileService.UpdateUserProfile(values, session?.user.token as string)
      const isOnlyPhotoPresentInValues = Object.keys(values).length === 1 && Object.keys(values)[0] === "photo"
      isOnlyPhotoPresentInValues ? toast.success("Profile Picture Updated Successfully") : toast.success("Profile updated successfully")
      setIsAccountEdit(false)
      setIsSocialEdit(false)
      fetchUserProfile()
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong fetching User Information. Try again!")
    } finally {
      setIsUpdatingResume(false)
      setIsUpdatingProfilePicture(false)
      setIsUpdatingProfile(false)
    }
  }

  const handleChangePassword = async (value: any) => {
    try {
      setIsChangingPassword(true)
      await ProfileService.ChangeUserPassword(value, session?.user.token as string)
      toast.success("Password changed successfully")
      setIsPasswordEdit(false)
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong changing password. Try again!")
    } finally {
      setIsChangingPassword(false)
    }
  }


  const handleDeleteResume = async () => {
    if (!profile || !profile?.resumeId) return

    try {
      setIsRemovingResume(true)
      await ProfileService.DeleteResume(profile?._id as string, session?.user.token as string)
      toast.success("Resume deleted successfully")
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong when deleting resume. Try again!")
    } finally {
      setIsRemovingResume(false)
    }
  }

  const createOrUpdateProfile = (values: any) => {
    if (profile) {
      handleUpdateProfile(values)
    } else {
      handleCreateProfile(values)
    }
  }

  const formOne = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      state: '',
      country: '',
      photo: "",
      resume: "",
      about: '',
      discord: "",
      github: "",
      linkedIn: "",
      twitter: "",
      userId: undefined
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First Name is required'),
      lastName: Yup.string().required('Last Name is required'),
      about: Yup.string()
      // about: Yup.string()
    }),
    onSubmit: values => {
      console.log('Form One values:', values);
      if (photo) values.photo = photo as string
      if (resume) values.resume = resume as string
      createOrUpdateProfile(values)
      // console.log(values)
    },
  });
  const formTwo = useFormik({
    initialValues: {
      discord: "",
      github: "",
      linkedIn: "",
      twitter: "",
    },
    validationSchema: Yup.object({
      github: Yup.string().url("Must be a valid Url"),
      twitter: Yup.string().url("Must be a valid Url"),
      linkedIn: Yup.string().url("Must be a valid Url"),
      discord: Yup.string().url("Must be a valid Url"),
    }),
    onSubmit: values => {
      if (Object.values(values).every((value) => value === "")) return
      createOrUpdateProfile(values)
      // console.log(values)
    },
  });


  const formThree = useFormik({
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
      handleChangePassword(values)
    },
  });
  const formFour = useFormik({
    initialValues: {
      allowResumeDownload: true,
      allowPublicUrl: true,
    },
    onSubmit: values => {
      console.log('Form Four values:', values);
      handleUpdateProfile(values)
    },
  });

  const handleFileUpload = (e: any) => {
    if (isCreatingProfile || isUpdatingProfile) return
    // Get the selected file
    const selectedFile: File = e.target.files[0];
    // console.log('File: ', selectedFile)
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
            const base64String = base64URL

            // console.log('base64URL: ', base64String);

            // Update form values
            setPhoto(
              base64String,
            );
            if (profile) {
              const payload: IProfile = {
                ...profile,
                photo: base64String,
              }
              createOrUpdateProfile(payload)
            } else {
              createOrUpdateProfile({ photo: base64String })
            }
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
  const handleResumeUpload = (e: any) => {
    if (isCreatingProfile || isUpdatingProfile) return
    // Get the selected file
    const selectedFile: File = e.target.files[0];
    // console.log('File: ', selectedFile)
    // If a valid file was selected...
    const maxSizeInBytes = 5 * 1024 * 1024;
    if (selectedFile.type !== 'application/pdf') {
      toast.warning("Only .pdf files allowed")
    }
    if (selectedFile.size > maxSizeInBytes) {
      toast.warning("File size must not be more than 5mb")
    }
    if (
      selectedFile && selectedFile.type === 'application/pdf' &&
      selectedFile.size <= maxSizeInBytes
    ) {
      // Unset validation message
      setResumeErrorMsg(undefined);

      // Get the selected file

      const reader = new FileReader();

      reader.onload = (e) => {
        const base64URL: string = e.target?.result as string; // This is the base64 URL of the image

        if (base64URL) {
          // Extract only the base64 string (remove "data:image/jpeg;base64," prefix)
          const base64String = base64URL

          // console.log('base64URL: ', base64String);

          // Update form values
          console.log(base64String)
          setResume(
            base64String,
          );
          if (profile) {
            const payload: IProfile = {
              ...profile,
              resumeName: selectedFile.name,
              resume: base64String,
            }
            createOrUpdateProfile(payload)
          } else {
            createOrUpdateProfile({ resume: base64String, resumeName: selectedFile.name })
          }
        }
      };

      // Read the file as a data URL (base64-encoded)
      reader.readAsDataURL(selectedFile);

    }
    // Otherwise...
    else {
      // Set appropriate validation message
      setResumeErrorMsg('Please select a valid PDF document');

      // Exit this method
      return;
    }


  };

  const fetchUserProfile = async () => {
    try {
      setIsFetchingProfile(true)
      const response = (await ProfileService.FetchUserProfile(session?.user.token as string))
      const data = response.data
      if (data) {
        formOne.resetForm({ values: data })
        formTwo.resetForm({ values: data })
        formFour.resetForm({ values: data })
      }
      // console.log(data)
      setProfile(data)
      setImgUrl(data.imageUrl)
    } catch (error) {
      console.log(error)
      // toast.error("Something went wrong fetching User Information. Try again!")
    } finally {
      setIsFetchingProfile(false)
    }
  }

  const toggleDeleteModal = () => setIsDeleteModalOpen(!isDeleteModalOpen)
  const closeBtnEdit = (
    <button className="app_modal_close" onClick={toggleDeleteModal} type="button">
      &times;
    </button>
  );

  useEffect(() => {
    if (typeof window !== undefined) {
      // console.log(session)
      setHostname(window.location.hostname)
      setEmail(session?.user.email as string)
      fetchUserProfile()
    }
  }, [session])

  return (
    <section>
      <DeleteModal name='Resume' toggle={toggleDeleteModal} closeBtn={closeBtnEdit} handleDelete={handleDeleteResume} isModalOpen={isDeleteModalOpen} isDeleting={isRemovingResume} />
      <h3 className={`app-heading ${pathname === '/profile/account' && 'text-start'}`}>Account</h3>
      <div className={styles.account_wrapper}>
        <div className={styles.account_top}>
          <div className={styles.account_identity}>
            <div className={styles.account_profile_pic}>
              {imgUrl ? <Image src={imgUrl} alt='img' className={styles.imgUrl} fill /> : <Image src={AddPhotoIcon} alt='img' className='add_image_icon' />}

            </div>
            <div className={styles.account_name}>
              <h4>@{session?.user.username}</h4>
              <label className="mb-4">
                <input type="file" onChange={handleFileUpload} />
                {isUpdatingProfilePicture ? <Spinner>Loading...</Spinner> : "Change Profile Picture"}

              </label>
              {
                profile?.resumeUrl ?
                  <div className='d-flex gap-4'>
                    <label className={styles.changeResume}>
                      <input type="file" onChange={handleResumeUpload} />
                      {isUpdatingResume ? <Spinner>Loading...</Spinner> : "Change Resume (.pdf)"}

                    </label>
                    <label onClick={toggleDeleteModal} className={styles.removeResume}>
                      {isRemovingResume ? <Spinner>Loading...</Spinner> : "Remove Resume"}
                    </label>
                  </div>
                  :
                  <label className={styles.uploadResume}>
                    <input type="file" onChange={handleResumeUpload} />
                    {isUpdatingResume ? <Spinner>Loading...</Spinner> : "Upload Resume (.pdf)"}

                  </label>
              }
              {
                profile?.resumeName &&
                <small>{profile.resumeName.length > 15 ? `${profile.resumeName.substring(0, 15)}...` : profile.resumeName}</small>
              }
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
                  onInput={formOne.handleChange}
                  onBlur={formOne.handleBlur}
                />
                {formOne.errors.firstName && <small className='form-error-feedback'>{formOne.errors.firstName}</small>}
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
                  onInput={formOne.handleChange}
                  onBlur={formOne.handleBlur}
                />
                {formOne.errors.lastName && <small className='form-error-feedback'>{formOne.errors.lastName}</small>}
              </div>
            </div>
            <div className='d-flex gap-5'>
              <div className={styles.form_group}>
                <label>Email</label>
                <input type="text" value={email} readOnly />
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
                  onInput={formOne.handleChange}
                  onBlur={formOne.handleBlur}
                />

              </div>
            </div>
            <div className='d-flex gap-5'>
              <div className={styles.form_group}>
                <label>State</label>
                <input type="text"
                  name="state"
                  placeholder='Enter State'
                  readOnly={!isAccountEdit}
                  value={formOne.values.state}
                  onChange={formOne.handleChange}
                  onInput={formOne.handleChange}
                  onBlur={formOne.handleBlur} />
              </div>
              <div className={styles.form_group}>
                <label>Country</label>
                <input
                  type="text"
                  name="country"
                  placeholder='Enter Country'
                  readOnly={!isAccountEdit}
                  value={formOne.values.country}
                  onChange={formOne.handleChange}
                  onInput={formOne.handleChange}
                  onBlur={formOne.handleBlur}
                />

              </div>
            </div>
            <div className={styles.form_group}>
              <label>About</label>
              <textarea
                name="about"
                id="about"
                readOnly={!isAccountEdit}
                onChange={formOne.handleChange}
                onInput={formOne.handleChange}
                onBlur={formOne.handleBlur}
                value={formOne.values.about} placeholder='Enter short intro about yourself'>

              </textarea>
            </div>
            {
              isAccountEdit ?
                <div className={styles.edit_actions}>
                  <span onClick={() => setIsAccountEdit(false)}>Cancel</span>
                  <button type='submit'>{(isCreatingProfile || isUpdatingProfile) ? <Spinner>Loading...</Spinner> : 'Submit'}</button>
                </div> :
                <span onClick={() => setIsAccountEdit(true)} className={styles.edit_btn}>Edit</span>
            }
          </form>
          {/* <div className={styles.about}>
            <h6>About</h6>
            About Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo illum saepe expedita dignissimos odit commodi voluptatem ab vitae distinctio, ipsa nesciunt eaque cum aliquid aliquam suscipit non, dolorem sint a?
          </div> */}
        </div>

        <form className={styles.account_middle} onSubmit={formTwo.handleSubmit}>
          <h6>Socials</h6>
          <div className='d-flex gap-5'>
            <div className={styles.form_group}>
              <label>Github</label>
              <input
                type="text"
                name="github"
                placeholder='e.g. https://github.com/{username}'
                value={formTwo.values.github}
                readOnly={!isSocialEdit}
                onChange={formTwo.handleChange}
                onInput={formTwo.handleChange}
                onBlur={formTwo.handleBlur}
              />
              {formTwo.errors.github && <small className='form-error-feedback'>{formTwo.errors.github}</small>}
            </div>
            <div className={styles.form_group}>
              <label>LinkedIn</label>
              <input
                type="text"
                name="linkedIn"
                placeholder='e.g. https://linkedin.com/in/{username}'
                value={formTwo.values.linkedIn}
                readOnly={!isSocialEdit}
                onChange={formTwo.handleChange}
                onInput={formTwo.handleChange}
                onBlur={formTwo.handleBlur}
              />
              {formTwo.errors.linkedIn && <small className='form-error-feedback'>{formTwo.errors.linkedIn}</small>}
            </div>
          </div>
          <div className='d-flex gap-5'>
            <div className={styles.form_group}>
              <label>Twitter</label>
              <input
                type="text"
                name="twitter"
                placeholder='e.g. https://x.com/{username}'
                value={formTwo.values.twitter}
                readOnly={!isSocialEdit}
                onChange={formTwo.handleChange}
                onInput={formTwo.handleChange}
                onBlur={formTwo.handleBlur}
              />
              {formTwo.errors.twitter && <small className='form-error-feedback'>{formTwo.errors.twitter}</small>}
            </div>
            <div className={styles.form_group}>
              <label>Discord</label>
              <input
                type="text"
                name="discord"
                placeholder='e.g. https://discord.com'
                value={formTwo.values.discord}
                readOnly={!isSocialEdit}
                onChange={formTwo.handleChange}
                onInput={formTwo.handleChange}
                onBlur={formTwo.handleBlur}
              />
              {formTwo.errors.discord && <small className='form-error-feedback'>{formTwo.errors.discord}</small>}
            </div>
          </div>
          {
            isSocialEdit ?
              <div className={styles.edit_actions}>
                <span onClick={() => setIsSocialEdit(false)}>Cancel</span>
                <button type="submit">{(isCreatingProfile || isUpdatingProfile) ? <Spinner>Loading...</Spinner> : 'Submit'}</button>
              </div> :
              <span onClick={
                () => {
                  if (!profile) {
                    toast.warning("First Name and Last Name not found. Please create them first.")
                    return
                  }
                  setIsSocialEdit(true)
                }}
                className={styles.edit_btn}
              >
                Edit
              </span>
          }
        </form>

        <form onSubmit={formThree.handleSubmit} className={styles.account_middle}>
          <div >
            <div className={styles.form_group}>
              <h6>Current Password</h6>
              <input
                type="password"
                name="password"
                readOnly={!isPasswordEdit}
                placeholder={isPasswordEdit ? 'Enter Password' : '***********'}
                onChange={formThree.handleChange}
                onInput={formThree.handleChange}
                onBlur={formThree.handleBlur}
                value={formThree.values.password}
              />
              {formThree.errors.password && <small className='form-error-feedback'>{formThree.errors.password}</small>}
            </div>
            {
              isPasswordEdit &&
              <div className='d-flex gap-5'>
                <div className={styles.form_group}>
                  <label>New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    placeholder='Enter New Password'
                    onChange={formThree.handleChange}
                    onInput={formThree.handleChange}
                    onBlur={formThree.handleBlur}
                    value={formThree.values.newPassword} />
                  {formThree.errors.newPassword && <small className='form-error-feedback'>{formThree.errors.newPassword}</small>}
                </div>
                <div className={styles.form_group}>
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder='Enter Confirm Password'
                    onChange={formThree.handleChange}
                    onInput={formThree.handleChange}
                    onBlur={formThree.handleBlur}
                    value={formThree.values.confirmPassword}
                  />
                  {formThree.errors.confirmPassword && <small className='form-error-feedback'>{formThree.errors.confirmPassword}</small>}
                </div>
              </div>
            }
          </div>
          {
            isPasswordEdit ?
              <div className={styles.edit_actions}>
                <span
                  onClick={() => {
                    setIsPasswordEdit(false)
                    formThree.resetForm()
                  }}
                >
                  Cancel
                </span>
                <button type='submit'>{isChangingPassword ? <Spinner>Loading...</Spinner> : 'Submit'}</button>
              </div> :
              <span onClick={() => {
                if (!profile) {
                  return
                }
                setIsPasswordEdit(true)
              }} className={styles.edit_btn}>Edit</span>
          }
        </form>
        <form onSubmit={formFour.handleSubmit} className={styles.account_bottom}>
          <div >
            <h6>Settings</h6>
            <FormGroup switch className={styles.form_group}>
              <Input type="switch" role="switch" name="allowResumeDownload" onChange={formFour.handleChange} onBlur={formFour.handleBlur} checked={formFour.values.allowResumeDownload} disabled={!isSettingsEdit} />
              <label className="ms-4">Allow Resume Download</label>
            </FormGroup>

            <div className='d-flex align-items-center gap-5'>
              <FormGroup switch className={styles.form_group}>
                <Input type="switch" role="switch" name="allowPublicUrl" onChange={formFour.handleChange} onBlur={formFour.handleBlur} checked={formFour.values.allowPublicUrl} disabled={!isSettingsEdit} className={styles.input_switch} />
                <label className='ms-4'>Allow Public Url</label>
              </FormGroup>
              {formFour.values.allowPublicUrl &&
                <div className={`d-flex align-items-center gap-4 ${styles.form_group} ${styles.form_group_icon}`}>
                  <input type="text" readOnly value={`https://${hostname}/public/${session?.user.username}`} className={styles.input_copy_icon} />
                  <CopyIcon onClick={handleCopyClick} />
                </div>
              }
            </div>

          </div>
          {
            isSettingsEdit ?
              <div className={styles.edit_actions}>
                <span
                  onClick={() => {
                    setIsSettingsEdit(false)
                  }}
                >
                  Cancel
                </span>
                <button type='submit'>{isUpdatingProfile ? <Spinner>Loading...</Spinner> : 'Submit'}</button>
              </div> :
              <span onClick={() => {
                if (!profile) {
                  toast.warning("First Name and Last Name not found. Please create them first.")
                  return
                }
                setIsSettingsEdit(true)
              }} className={styles.edit_btn}>Edit</span>
          }
        </form>
      </div>
    </section>
  )
}

export default Account