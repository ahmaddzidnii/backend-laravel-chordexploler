import axios from "axios";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { COOKIE_NAME_ACCESS_TOKEN, COOKIE_NAME_REFRESH_TOKEN } from "@/config/cookies";

export const axiosAuthenticatedInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
  timeout: 1000 * 10 * 3, // 30 seconds
});

// Function to refresh token
const refreshAccessToken = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`, {
      withCredentials: true,
    });

    const { access_token } = response.data.data;
    setCookie("access_token", access_token);
    return access_token;
  } catch (error) {
    console.error("Failed to refresh token", error);
    throw error;
  }
};

// Function to handle logout
const handleLogout = () => {
  deleteCookie(COOKIE_NAME_ACCESS_TOKEN);
  deleteCookie(COOKIE_NAME_REFRESH_TOKEN);
  window.location.href = process.env.NEXT_PUBLIC_LOGIN_URL ?? "/auth/login";
};

// Axios interceptor
axiosAuthenticatedInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized error
    if (error.response?.status === 401) {
      const refreshToken = getCookie(COOKIE_NAME_REFRESH_TOKEN);

      // If we have a refresh token and haven't retried yet
      if (refreshToken && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const newAccessToken = await refreshAccessToken();
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosAuthenticatedInstance(originalRequest);
        } catch (refreshError) {
          // If refresh token fails, logout user
          console.error("Refresh token failed", refreshError);
          handleLogout();
          return Promise.reject(refreshError);
        }
      } else {
        // No refresh token or already retried, logout user
        handleLogout();
        return Promise.reject(error);
      }
    }

    // For all other errors, just reject the promise
    return Promise.reject(error);
  }
);
