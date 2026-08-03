import axios from "axios";

// Base URL of the ASP.NET Core API. Set VITE_API_URL in .env, e.g.
// VITE_API_URL=https://localhost:7001/api
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
console.log(baseURL);
const axiosClient = axios.create({
  baseURL,
  // Required so the HttpOnly JWT cookie set by ASP.NET Core is sent
  // with every request (login endpoint must issue it with SameSite
  // configured to allow this).
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor: redirect to /login on 401 (mirrors the MVC
// OnChallenge behavior that used to redirect to /Auth/Login).
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export default axiosClient;
