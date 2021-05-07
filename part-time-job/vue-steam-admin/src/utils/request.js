import axios from "axios";
import { Message } from 'element-ui';
import { getToken } from "@/utils/auth";
import qs from 'qs'

axios.defaults.baseURL = "http://localhost:3000";

axios.interceptors.request.use((config) => {
  config.headers["Content-Type"] = "application/x-www-form-urlencoded"
  if (config.header == "json") {
    config.headers["Content-Type"] = "application/json";
  } else if (config.header == 'formdata'){
    config.headers["Content-Type"] = "'multipart/form-data'"
  } else {
    config.data = qs.stringify(config.data)
  }
  if (config.private) {
    if (getToken()) {
      config.headers["x-token"] = getToken();
    }
  }
  return config;
});
// const router = useRouter()
axios.interceptors.response.use(
  (response) => {
    const res = response.data;
    if(res.code == 403) {
      return
    }
    if (res.code != 1) {
      Message.error(res.msg)
      return res;
    } else {
      return res;
    }
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default axios;
