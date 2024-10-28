import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import requestInterceptor from "../interceptors/requestInterceptor";
import responseInterceptor from "../interceptors/responseInterceptor";

export default function apiConfig(): AxiosInstance {

    const apiConfig: AxiosInstance = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });

    apiConfig.interceptors.request.use((config: InternalAxiosRequestConfig) => requestInterceptor(config));
    apiConfig.interceptors.response.use(responseInterceptor);

    return apiConfig;
}