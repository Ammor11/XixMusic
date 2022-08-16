import axios from "axios";

axios.defaults.baseURL = "http://192.168.0.170:3000";
axios.defaults.timeout = 5000;
declare module "axios" {
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>;
  }
}

// 添加请求拦截器
axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response.data.code === 401) {
      window.location.href = "#/login";
    }
    return Promise.reject(error);
  }
);

//暴露axios
export default axios;
