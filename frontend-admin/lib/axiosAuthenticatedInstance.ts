import axios from "axios";

export const axiosAuthenticatedInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
  timeout: 10000,
});
