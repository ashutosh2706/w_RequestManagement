import { InternalAxiosRequestConfig } from 'axios';
import { getCookie } from '../utils/cookieUtil';

export default function requestInterceptor(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {

    const token = getCookie('token') ?? '';
    config.headers['Authorization'] = `Bearer ${token}`;
    // config.headers['x-api-key'] = import.meta.env.VITE_API_KEY;
    return config;
}