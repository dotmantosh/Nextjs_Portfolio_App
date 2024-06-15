export class ApiRoutes {
  static BASE_URL_DEV = "http://localhost:5000/api/v1";
  static BASE_URL_LIVE = "https://devsfolio-livid.vercel.app/api/v1";

  static SignUpUser = "/user/signup";
  static LoginUser = "/user/login";
  static LogoutUser = "/user/logout";
  static SendContactUsEmail = "/public/contact-us"
  static SendResetEmail = "/user/forgot-password"
  static ResetPassword = "/user/reset-password"
  static CheckResetPasswordLink = "/user/validate-reset-password-link"
  static ChangeUserPassword = "/user/change-password"

  static FetchUserProfile = "/profile/user/fetch"
  static FetchProfile = "/profile/fetch"
  static FetchProfileByUsername = "/profile/public/fetch"
  static CreateProfile = "/profile/create"
  static UpdateProfile = "/profile/update"
  static UpdateUserProfile = "/profile/user/update"
  static DeleteResume = "/profile/resume/delete"

  static FetchSkills = "/skill/fetch/all";
  static FetchUserTechStack = "tech-stack/user/fetch";
  static FetchTechStack = "tech-stack/fetch";
  static FetchTechStackByUsername = "tech-stack/public/fetch";
  static CreateUserTechStack = "/tech-stack/create";
  static UpdateUserTechStack = "/tech-stack/update";
  static DeleteUserTechStack = "/tech-stack/delete";

  static FetchEducation = "/education/fetch"
  static FetchEducationByUsername = "/education/public/fetch"
  static CreateEducation = "/education/create"
  static UpdateEducation = "/education/update"
  static DeleteEducation = "/education/delete"


  static FetchWorkExperience = "/work-experience/fetch"
  static FetchWorkExperienceByUsername = "/work-experience/public/fetch"
  static CreateWorkExperience = "/work-experience/create"
  static UpdateWorkExperience = "/work-experience/update"
  static DeleteWorkExperience = "/work-experience/delete"

  static FetchProject = "/project/fetch"
  static FetchProjectByUsername = "/project/public/fetch"
  static FetchProjectById = "/project/public/fetch"
  static CreateProject = "/project/create"
  static UpdateProject = "/project/update"
  static DeleteProject = "/project/delete"

}