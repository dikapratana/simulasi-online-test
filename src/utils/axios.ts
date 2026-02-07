import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import { ENV } from "../configs/constants/env";

interface SignedAxiosRequestConfig extends InternalAxiosRequestConfig {
  signed?: boolean;
}

const api = axios.create({
  baseURL: ENV.apiUrl,
  timeout: 15000,
});

api.interceptors.request.use(
  (config: SignedAxiosRequestConfig) => {
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;