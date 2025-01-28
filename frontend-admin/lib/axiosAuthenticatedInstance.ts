import axios from "axios";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

export const axiosAuthenticatedInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
  timeout: 10000,
});

// Function to refresh token
const refreshAccessToken = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`, {
      withCredentials: true,
    });

    const { access_token } = response.data.data;

    // Update cookies with new tokens
    setCookie("access_token", access_token);

    return access_token;
  } catch (error) {
    console.error("Failed to refresh token", error);
    throw error;
  }
};

// Axios interceptor
axiosAuthenticatedInstance.interceptors.response.use(
  (response) => response, // Pass through successful responses
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = getCookie("refresh_token");
    if (refreshToken) {
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // Mark this request as retried

        try {
          const newAccessToken = await refreshAccessToken();
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosAuthenticatedInstance(originalRequest); // Retry the original request with the new token
        } catch (refreshError) {
          console.error("Refresh token failed", refreshError);
          deleteCookie("access_token");
          return Promise.reject(refreshError);
        }
      }
    } else {
      deleteCookie("access_token");
      deleteCookie("refresh_token");
      window.location.href = process.env.NEXT_PUBLIC_LOGIN_URL ?? "/auth/login";
    }

    return Promise.reject(error);
  }
);
