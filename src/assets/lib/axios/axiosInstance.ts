import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { refreshTokens } from './refresh';

let isRefreshing = false;

let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (error?: unknown) => void;
}[] = [];

const processQueue = (error: unknown) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(true);
    }
  });

  failedQueue = [];
};

const axiosInstance = axios.create({
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (!error.response) {
      return Promise.reject(error);
    }

    const status = error.response.status;

    if ((status === 401 || status === 403) && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: () => resolve(axiosInstance(originalRequest)),
            reject: (err) => reject(err),
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await refreshTokens();

        processQueue(null);

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
