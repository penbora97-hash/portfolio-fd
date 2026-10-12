import api from "./api";

// ==================== API CALLS ====================
export const getProfile = () => api.get("/profile").then((r) => r.data);
export const getProjects = () => api.get("/projects").then((r) => r.data);
export const getSkills = () => api.get("/skills").then((r) => r.data);
export const getExperiences = () => api.get("/experiences").then((r) => r.data);
export const getEducation = () => api.get("/education").then((r) => r.data);
export const getTestimonials = () =>
  api.get("/testimonials").then((r) => r.data);

export const sendContact = (payload) =>
  api.post("/contact", payload).then((r) => r.data);

export const getCertificates = async () => {
  const { data } = await api.get("/certificates");
  return data;
};

export const getLearnings = async () => {
  const { data } = await api.get("/learnings");
  return data;
};

// ==================== HELPER: IMAGE URL ====================
/**
 * ទាញយក URL រូបភាពត្រឹមត្រូវ
 * - បើ URL ពេញលេញ (Cloudinary) → ប្រើវាដោយផ្ទាល់
 * - បើ Path ចាស់ → បន្ថែម VITE_STORAGE_URL
 */
export const getImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${import.meta.env.VITE_STORAGE_URL}/${path}`;
};
