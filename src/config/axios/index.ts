import { BASE_URL, USER_TOKEN } from '@/constants/index';
import axios, { AxiosRequestConfig } from 'axios';

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  contentType?: string;
}

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const axiosInstancePrivate = axios.create({
  baseURL: BASE_URL,
});

export const fetchRequest = async (request: AxiosRequestConfig) => {
  return await axiosInstance({
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
    withCredentials: true,
    ...request,
  });
};

export const fetchRequestWithToken = async (
  request: CustomAxiosRequestConfig,
) => {
  return await axiosInstancePrivate({
    method: 'GET',
    headers: {
      'Content-type': request.contentType
        ? request.contentType
        : 'application/json',
      Authorization: `Bearer ${localStorage.getItem(USER_TOKEN)}`,
    },
    withCredentials: true,
    ...request,
  });
};

export const refreshToken = async () => {
  const response = await axiosInstance({
    url: `/api/auth/refresh_token/`,
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
    withCredentials: true,
  });
  if (response.status === 200) {
    return { response: response.data };
  } else {
    return { response: null };
  }
};
