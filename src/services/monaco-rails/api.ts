import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import Config from 'react-native-config';
import { getAuthToken } from './authService';

export interface ApiResponse<T> {
  data: T;
  message: string;
  // other response fields
}

class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: Config.API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        // Add any custom headers you need
      },
    });

    // Add interceptors
    this.axiosInstance.interceptors.request.use(
      async config => {
        // Modify the request config before sending the request
        // For example, add an authorization token if available
        const token = await getAuthToken(); // Implement this function according to your auth logic
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => {
        // Handle request error
        return Promise.reject(error);
      },
    );
    this.axiosInstance.interceptors.response.use(
      response => {
        // Any status code that lies within the range of 2xx causes this function to trigger
        return response;
      },
      error => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Handle response errors
        if (error.response) {
          // Server responded with a status other than 2xx
          console.log('Response Error:', error.response.status);
          // You can handle specific status codes here
        } else if (error.request) {
          // Request was made but no response received
          console.log('No Response:', error.request);
        } else {
          // Something happened in setting up the request
          console.log('Error', error.message);
        }
        return Promise.reject(error);
      },
    );
  }

  public get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get<T>(url, config);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post<T>(url, data, config);
  }

  // Add put, delete, etc., methods similarly
}

export default new ApiClient();
