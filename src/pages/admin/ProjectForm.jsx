import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaUpload, FaTimes } from "react-icons/fa";
import api from "../../services/api";

export default function ProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    title: "",
    description: "",
    demo_url: "",
    github_url: "",
  });
  const [thumbnail, setThumbnail] = useState(null); // File ដែលជ្រើសរើស
  const [preview, setPreview] = useState(""); // រូបភាព Preview
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // បើ Edit ទាញយកទិន្នន័យចាស់
  useEffect(() => {
    if (isEdit) {
      api
        .get(`/projects/${id}`)
        .then(({ data }) => {
          setForm({
            title: data.title || "",
            description: data.description || "",
            demo_url: data.demo_url || "",
            github_url: data.github_url || "",
          });
          // បង្ហាញរូបភាពចាស់ជា Preview
          if (data.thumbnail_url) {
            setPreview(data.thumbnail_url);
          }
        })
        .catch(() => setError("Failed to load project"));
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ពេលជ្រើសរើសរូបភាពថ្មី
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setPreview(URL.createObjectURL(file)); // បង្ហាញ Preview ភ្លាមៗ
    }
  };

  // លុបរូបភាពចេញ
  const handleRemoveImage = () => {
    setThumbnail(null);
    setPreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // ប្រើ FormData ព្រោះយើងផ្ញើ File
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description || "");
    formData.append("demo_url", form.demo_url || "");
    formData.append("github_url", form.github_url || "");

    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    // ចាំបាច់សម្រាប់ Laravel PUT method ជាមួយ FormData
    if (isEdit) {
      formData.append("_method", "PUT");
    }

    try {
      if (isEdit) {
        await api.post(`/projects/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/projects", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      navigate("/admin/projects");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <Link
        to="/admin/projects"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#84cc16] transition-colors mb-6"
      >
        <FaArrowLeft /> Back to Projects
      </Link>

      <h1 className="text-3xl font-serif font-bold mb-2">
        {isEdit ? "Edit Project" : "New Project"}
      </h1>
      <p className="text-sm text-gray-500 mb-8">
        {isEdit
          ? "Update project information"
          : "Add a new project to your portfolio"}
      </p>

      {error && (
        <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
            Title *
          </label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-700 bg-[#0f172a] px-4 py-3 text-white outline-none focus:border-[#84cc16] transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-lg border border-gray-700 bg-[#0f172a] px-4 py-3 text-white outline-none focus:border-[#84cc16] transition-colors resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
              Demo URL
            </label>
            <input
              name="demo_url"
              value={form.demo_url}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-700 bg-[#0f172a] px-4 py-3 text-white outline-none focus:border-[#84cc16] transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
              GitHub URL
            </label>
            <input
              name="github_url"
              value={form.github_url}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-700 bg-[#0f172a] px-4 py-3 text-white outline-none focus:border-[#84cc16] transition-colors"
            />
          </div>
        </div>

        {/* Thumbnail Upload */}
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
            Thumbnail
          </label>

          {preview ? (
            // បង្ហាញរូបភាព Preview
            <div className="relative w-full max-w-xs">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg border border-gray-700"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                <FaTimes />
              </button>
            </div>
          ) : (
            // បង្ហាញ Upload Box
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-[#84cc16] transition-colors bg-[#0f172a]">
              <div className="flex flex-col items-center gap-2 text-gray-500">
                <FaUpload className="text-2xl" />
                <p className="text-sm">Click to upload image</p>
                <p className="text-xs">PNG, JPG, WEBP (Max 2MB)</p>
              </div>
              <input
                type="file"
                accept="image/png, image/jpeg, image/webp"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          )}
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-[#84cc16] px-6 py-3 text-sm font-semibold text-black hover:bg-[#65a30d] transition-all duration-300 disabled:opacity-50"
          >
            {loading
              ? "Saving..."
              : isEdit
                ? "Update Project"
                : "Create Project"}
          </button>
          <Link
            to="/admin/projects"
            className="rounded-lg border border-gray-700 px-6 py-3 text-sm font-semibold text-gray-400 hover:bg-gray-800 transition-all duration-300"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
