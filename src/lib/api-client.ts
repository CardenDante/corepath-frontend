import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

// Create the main API client
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage (only on client side)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling and token refresh
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 errors and attempt token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        if (typeof window !== 'undefined') {
          const refreshToken = localStorage.getItem('refresh_token');
          
          if (refreshToken) {
            const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
              refresh_token: refreshToken,
            });
            
            const { access_token, refresh_token: newRefreshToken } = response.data;
            
            // Update tokens in localStorage
            localStorage.setItem('access_token', access_token);
            if (newRefreshToken) {
              localStorage.setItem('refresh_token', newRefreshToken);
            }
            
            // Retry the original request with new token
            originalRequest.headers.Authorization = `Bearer ${access_token}`;
            return apiClient(originalRequest);
          }
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        if (typeof window !== 'undefined') {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          // Redirect to login page
          window.location.href = '/auth/login';
        }
      }
    }

    return Promise.reject(error);
  }
);

// Helper function to handle API responses
export const handleApiResponse = <T>(response: AxiosResponse): T => {
  return response.data;
};

// Helper function to handle API errors
export const handleApiError = (error: any): never => {
  if (error.response) {
    // Server responded with error status
    const message = error.response.data?.message || error.response.data?.detail || 'An error occurred';
    throw new Error(message);
  } else if (error.request) {
    // Request was made but no response received
    throw new Error('Network error. Please check your connection.');
  } else {
    // Something else happened
    throw new Error(error.message || 'An unexpected error occurred');
  }
};

// Wrapper functions for common HTTP methods
export const apiGet = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await apiClient.get(url, config);
    return handleApiResponse<T>(response);
  } catch (error) {
    handleApiError(error);
    // The following line is unreachable, but required for type safety
    throw error;
  }
};

export const apiPost = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await apiClient.post(url, data, config);
    return handleApiResponse<T>(response);
  } catch (error) {
    handleApiError(error);
    throw error; // Ensure function always returns or throws
  }
};

export const apiPut = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await apiClient.put(url, data, config);
    return handleApiResponse<T>(response);
  } catch (error) {
    handleApiError(error);
    throw error; // Ensure function always returns or throws
  }
};

export const apiDelete = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await apiClient.delete(url, config);
    return handleApiResponse<T>(response);
  } catch (error) {
    handleApiError(error);
    // The following line is unreachable, but required for type safety
    throw error;
  }
};

// File upload helper
export const apiUpload = async <T>(
  url: string, 
  formData: FormData, 
  onUploadProgress?: (progressEvent: any) => void
): Promise<T> => {
  try {
    const response = await apiClient.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    });
    return handleApiResponse<T>(response);
  } catch (error) {
    handleApiError(error);
    throw error; // Ensure function always returns or throws
  }
};

// WordPress API client for blog
const WP_API_BASE_URL = process.env.NEXT_PUBLIC_WP_API_URL || 'https://your-wordpress-site.com/wp-json/wp/v2';

export const wpApiClient: AxiosInstance = axios.create({
  baseURL: WP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// WordPress API helpers
export const wpGet = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await wpApiClient.get(url, config);
    return response.data;
  } catch (error) {
    console.error('WordPress API Error:', error);
    throw new Error('Failed to fetch blog content');
  }
};

export default apiClient;