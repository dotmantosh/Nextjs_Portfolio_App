import Api from './apiClient'
import { ApiRoutes } from './apiRoutes'
import { getAuthorization } from '../helpers/axios'

export class AuthService {
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

  static FetchEducation() {
    return Api().get(ApiRoutes.FetchEducation)
  }

  static CreateEducation() {
    return Api().post(ApiRoutes.CreateEducation)
  }
  static UpdateEducation() {
    return Api().put(ApiRoutes.UpdateEducation)
  }

  static DeleteEducation() {
    return Api().delete(ApiRoutes.DeleteEducation)
  }

  static FetchWorkExperience() {
    return Api().get(ApiRoutes.FetchWorkExperience)
  }

  static CreateWorkExperience() {
    return Api().post(ApiRoutes.CreateWorkExperience)
  }
  static UpdateWorkExperience() {
    return Api().put(ApiRoutes.UpdateWorkExperience)
  }

  static DeleteWorkExperience() {
    return Api().delete(ApiRoutes.DeleteWorkExperience)
  }

  static FetchProject() {
    return Api().get(ApiRoutes.FetchProject)
  }

  static CreateProject() {
    return Api().post(ApiRoutes.CreateProject)
  }
  static UpdateProject() {
    return Api().put(ApiRoutes.UpdateProject)
  }

  static DeleteProject() {
    return Api().delete(ApiRoutes.DeleteProject)
  }



  // static LogoutUser(token: string) {
  //   const config = getAuthorization(token)
  //   return Api().get(ApiRoutes.LogoutUser, config)
  // }
}