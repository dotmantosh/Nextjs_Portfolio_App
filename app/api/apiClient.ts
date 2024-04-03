import axios from "axios";
import { ApiRoutes } from "./apiRoutes";

const baseURL = ApiRoutes.BASE_URL_DEV
const Api = () => {
  return axios.create({
    baseURL,
  });
};

export default Api