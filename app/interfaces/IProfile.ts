export interface IProfile {
  _id?: string
  firstName: string
  lastName: string
  phoneNumber: string
  state: string
  country: string
  about: string,
  imageId: string,
  imageUrl: string,
  resumeId: string,
  resumeUrl: string,
  resumeName: string,
  allowResumeDownload: boolean,
  github: string,
  linkedIn: string,
  twitter: string,
  discord: string,
  photo?: string,
  resume?: string,
  userId: string
}