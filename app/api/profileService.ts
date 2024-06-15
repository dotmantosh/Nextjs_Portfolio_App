import Api from './apiClient'
import { ApiRoutes } from './apiRoutes'
import { getAuthorization } from '../helpers/axios'
import { IEducation } from '../interfaces/IEducation'
import { IWorkExperience } from '../interfaces/IWorkExperience'
import { IProject } from '../interfaces/IProject'
import { getServerSession } from 'next-auth'
import { ISkill } from '../interfaces/ISkill'
import { config } from 'process'

export class ProfileService {
  static async getSession() {
    const session = await getServerSession()
    return session
  }

  static async UpdateSkillFromJson() {
    return Api().get("/update-imgUrl")
  }
  static async FetchUserProfile(token: string) {
    const config = getAuthorization(token)
    return Api().get(ApiRoutes.FetchUserProfile, config)
  }
  static FetchProfileByUsername(username: string) {
    return Api().get(`${ApiRoutes.FetchProfile}/${username}`)
  }
  static async CreateUserProfile(data: any, token: string) {
    const config = getAuthorization(token)
    return Api().post(ApiRoutes.CreateProfile, data, config)
  }
  static async UpdateUserProfile(data: any, token: string) {
    const config = getAuthorization(token)
    return Api().put(`${ApiRoutes.UpdateProfile}/${data._id}`, data, config)
  }

  static async DeleteResume(id: string, token: string) {
    const config = getAuthorization(token)
    return Api().delete(`${ApiRoutes.DeleteResume}/${id}`, config)
  }

  static async SendContactUs(data: any) {
    return Api().post(ApiRoutes.SendContactUsEmail, data)
  }
  static async SendResetEmail(data: { email: string }) {
    return Api().post(ApiRoutes.SendResetEmail, data)
  }

  static async CheckResetPasswordLink(token: string) {
    return Api().get(`${ApiRoutes.CheckResetPasswordLink}/${token}`)
  }
  static async ResetPassword(data: any, token: string) {
    return Api().post(`${ApiRoutes.ResetPassword}/${token}`, data)
  }

  static async ChangeUserPassword(data: any, token: string) {
    const config = getAuthorization(token as string)
    return Api().post(ApiRoutes.ChangeUserPassword, data, config)
  }

  // skills
  static FetchSkills() {
    return Api().get(ApiRoutes.FetchSkills)
  }

  static FetchUserTechStack(token: string) {
    const config = getAuthorization(token)
    return Api().get(ApiRoutes.FetchUserTechStack, config)
  }

  static FetchTechStackByUsername(username: string) {
    return Api().get(`${ApiRoutes.FetchTechStack}/${username}`)
  }

  static CreateUserTechStack(data: ISkill, token: string) {
    const config = getAuthorization(token)
    return Api().post(ApiRoutes.CreateUserTechStack, data, config)
  }
  static UpdateUserTechStack() {
    return Api().put(ApiRoutes.UpdateUserTechStack)
  }
  static DeleteUserTechStack(id: string, token: string) {
    const config = getAuthorization(token)
    return Api().delete(`${ApiRoutes.DeleteUserTechStack}/${id}`, config)
  }

  static FetchEducation(token: string) {
    const config = getAuthorization(token)
    return Api().get(ApiRoutes.FetchEducation, config)
  }

  static FetchEducationByUsername(username: string) {
    return Api().get(`${ApiRoutes.FetchEducation}/${username}`)
  }

  static CreateEducation(data: IEducation, token: string) {
    const config = getAuthorization(token)
    return Api().post(ApiRoutes.CreateEducation, data, config)
  }
  static UpdateEducation(data: IEducation, id: string, token: string) {
    const config = getAuthorization(token)
    return Api().put(ApiRoutes.UpdateEducation + `/${id}`, data, config)
  }

  static DeleteEducation(id: string, token: string) {
    const config = getAuthorization(token)
    return Api().delete(ApiRoutes.DeleteEducation + `/${id}`, config)
  }

  static FetchWorkExperience(token: string) {
    const config = getAuthorization(token)
    return Api().get(ApiRoutes.FetchWorkExperience, config)
  }

  static FetchWorkExperienceByUsername(username: string) {
    return Api().get(`${ApiRoutes.FetchWorkExperience}/${username}`)
  }

  static CreateWorkExperience(data: IWorkExperience, token: string) {
    const config = getAuthorization(token)
    return Api().post(ApiRoutes.CreateWorkExperience, data, config)
  }
  static UpdateWorkExperience(data: IWorkExperience, id: string, token: string) {
    const config = getAuthorization(token)
    return Api().put(ApiRoutes.UpdateWorkExperience + `/${id}`, data, config)
  }

  static DeleteWorkExperience(id: string, token: string) {
    const config = getAuthorization(token)
    return Api().delete(ApiRoutes.DeleteWorkExperience + `/${id}`, config)
  }

  static FetchProject(token: string) {
    const config = getAuthorization(token)
    return Api().get(ApiRoutes.FetchProject, config)
  }

  static FetchProjectByUsername(username: string) {
    return Api().get(`${ApiRoutes.FetchProject}/${username}`)
  }
  static FetchProjectById(id: string) {
    return Api().get(`${ApiRoutes.FetchProjectById}/${id}`)
  }

  static CreateProject(data: IProject, token: string) {
    const config = getAuthorization(token)
    return Api().post(ApiRoutes.CreateProject, data, config)
  }
  static UpdateProject(data: IProject, id: string, token: string) {
    const config = getAuthorization(token)
    return Api().put(ApiRoutes.UpdateProject + `/${id}`, data, config)
  }

  static DeleteProject(id: string, token: string) {
    const config = getAuthorization(token)
    return Api().delete(ApiRoutes.DeleteProject + `/${id}`, config)
  }



  // static LogoutUser(token: string) {
  //   const config = getAuthorization(token)
  //   return Api().get(ApiRoutes.LogoutUser, config)
  // }
}