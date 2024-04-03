import Api from './apiClient'
import { ApiRoutes } from './apiRoutes'
import { getAuthorization } from '../helpers/axios'

export class AuthService {
  static LoginUser(payload: any) {
    return Api().post(ApiRoutes.LoginUser, payload)
  }

  static SignUpUser(payload: any) {
    return Api().post(ApiRoutes.SignUpUser, payload)
  }

  static LogoutUser(token: string) {
    const config = getAuthorization(token)
    return Api().get(ApiRoutes.LogoutUser, config)
  }
}