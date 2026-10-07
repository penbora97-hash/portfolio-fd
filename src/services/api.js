import axios from "axios";

const api = axios.create({
  // ✅ បើ VITE_API_URL មិនកំណត់ → បង្ហាញ Error ជំនួស Fallback
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// ✅ ពិនិត្យថា VITE_API_URL ត្រូវបានកំណត់
if (!import.meta.env.VITE_API_URL) {
  console.error(
    "❌ VITE_API_URL is not defined! Please check your Environment Variables.",
  );
}

// ភ្ជាប់ Token ទៅរាល់ Request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ចាប់ Error ពី Response
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  },
);

export default api;
