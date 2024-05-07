export class ApiRoutes {
  static BASE_URL_DEV = "http://localhost:5000/api/v1";

  static SignUpUser = "/user/signup";
  static LoginUser = "/user/login";
  static LogoutUser = "/user/logout";

  static FetchSkills = "/skill/fetch/all";
  static FetchUserTechStack = "/skills";
  static CreateUserTechStack = "/skills";
  static UpdateUserTechStack = "/skills";
  static DeleteUserTechStack = "/skills";

  static FetchEducation = "/education/fetch"
  static CreateEducation = "/education/create"
  static UpdateEducation = "/education/update"
  static DeleteEducation = "/education/delete"


  static FetchWorkExperience = "/work-experience/fetch"
  static CreateWorkExperience = "/work-experience/create"
  static UpdateWorkExperience = "/work-experience/update"
  static DeleteWorkExperience = "/work-experience/delete"

  static FetchProject = "/project/fetch"
  static CreateProject = "/project/create"
  static UpdateProject = "/project/update"
  static DeleteProject = "/project/delete"

}