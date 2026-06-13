import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

import { env } from '@/utils/const';
import { errorInterceptor, requestInterceptor, successInterceptor } from './interceptors';

const axiosRequestConfig: AxiosRequestConfig = {
  baseURL: env.API_URL + env.API_PREFIX + env.API_VERSION,
  responseType: 'json',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'x-api-key': env.API_KEY,
  },
};

const axiosRequestInternalConfig: AxiosRequestConfig = {
  baseURL: env.APP_URL + env.INTERNAL_API_PREFIX,
  responseType: 'json',
  timeout: 30000,
};

export const request: AxiosInstance = axios.create(axiosRequestConfig);
export const requestInternal: AxiosInstance = axios.create(axiosRequestInternalConfig);

export const getApiRequestClient = (): AxiosInstance => {
  return typeof window === 'undefined' ? request : requestInternal;
};

request.interceptors.request.use(requestInterceptor);
request.interceptors.response.use(successInterceptor, errorInterceptor);

requestInternal.interceptors.request.use(requestInterceptor);
requestInternal.interceptors.response.use(successInterceptor, errorInterceptor);
