import axios from "axios";
import { ElMessage } from 'element-plus'
import { getToken } from "@/utils/auth";
import qs from 'qs'
import router from '../router/index'

axios.defaults.baseURL = "http://localhost:3000";

axios.interceptors.request.use((config) => {
  console.log('axios',config);
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
      config.headers["token"] = getToken();
    }
  }
  return config;
});
// const router = useRouter()
axios.interceptors.response.use(
  (response) => {
    console.log('return',response);
    const res = response.data;
    if(res.code == 403) {
      return
    }
    if (res.code != 1) {
      ElMessage.error(res.msg)
      return res;
    } else {
      return res;
    }
  },
  (err) => {
    console.log("err", err);
    return Promise.reject(err);
  }
);

export default axios;
