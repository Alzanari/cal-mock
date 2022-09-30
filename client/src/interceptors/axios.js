import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/api";
axios.defaults.withCredentials = true;

let refresh = false;

axios.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    if (error.response.status === 401 && !refresh) {
      refresh = true;

      const ref = await axios.get("/auth/refreshtoken");
      let status = ref.status;

      if (status === 200) {
        return axios(error.config);
      }
    }
    refresh = false;
    return error;
  }
);
