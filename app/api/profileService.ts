import Api from './apiClient'
import { ApiRoutes } from './apiRoutes'
import { getAuthorization } from '../helpers/axios'
import { IEducation } from '../interfaces/IEducation'
import { IWorkExperience } from '../interfaces/IWorkExperience'
import { IProject } from '../interfaces/IProject'

export class ProfileService {
  // skills
  static FetchSkills() {
    return Api().get(ApiRoutes.FetchSkills)
  }

  static FetchUserTechStack() {
    return Api().post(ApiRoutes.FetchUserTechStack)
  }

  static CreateUserTechStack() {
    return Api().post(ApiRoutes.CreateUserTechStack)
  }
  static UpdateUserTechStack() {
    return Api().put(ApiRoutes.UpdateUserTechStack)
  }
  static DeleteUserTechStack() {
    return Api().delete(ApiRoutes.DeleteUserTechStack)
  }

  static FetchEducation(token: string) {
    const config = getAuthorization(token)
    return Api().get(ApiRoutes.FetchEducation, config)
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