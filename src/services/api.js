import axios from "axios";

const api = axios.create({
  // ប្រើ Fallback បើ VITE_API_URL មិនត្រូវបានកំណត់ក្នុង .env
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  // កំណត់ពេលវេលារង់ចាំ (Timeout) ១០ វិនាទី
  timeout: 10000,
});

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

// ចាប់ Error ពី Response (ឧទាហរណ៍៖ 401 Unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // បើ Token ផុតកំណត់ ឬមិនត្រឹមត្រូវ → លុប Token ចេញ
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      // បើបងចង់បញ្ជូនអ្នកប្រើប្រាស់ទៅ Login ស្វ័យប្រវត្តិ
      // window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  },
);

export default api;
