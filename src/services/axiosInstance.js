import axios from "axios";
import { getAccessToken,setTokens } from "../utils/tokenServices";

const axiosInstance = axios.create({
  baseURL: "https://syncspace.runasp.net/api",
});

// Attach access token to every request
axiosInstance.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration (401 error)
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await axios.get("/auth/refreshToken");
        const { token } = data;
        setTokens(token);
        axios.defaults.headers.Authorization = `Bearer ${token}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
