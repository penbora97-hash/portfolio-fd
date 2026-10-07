import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaUpload, FaTimes } from "react-icons/fa";
import api from "../../services/api";

const empty = {
  title: "",
  issuer: "",
  date: "",
  description: "",
  url: "",
  sort_order: 0,
};

export default function CertificateForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState(empty);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEdit) {
      api
        .get(`/certificates/${id}`)
        .then(({ data }) => {
          setForm({
            title: data.title || "",
            issuer: data.issuer || "",
            date: data.date || "",
            description: data.description || "",
            url: data.url || "",
            sort_order: data.sort_order || 0,
          });
          if (data.image_path) {
            setPreview(
              `${import.meta.env.VITE_STORAGE_URL}/${data.image_path}`,
            );
          }
        })
        .catch(() => setError("Failed to load"));
    }
  }, [id, isEdit]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    Object.entries(form).forEach(([k, v]) => formData.append(k, v ?? ""));
    if (image) formData.append("image", image); // ✅ ផ្ញើរូបភាព
    if (isEdit) formData.append("_method", "PUT");

    try {
      if (isEdit) {
        await api.post(`/certificates/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/certificates", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      navigate("/admin/certificates");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "w-full rounded-lg border border-gray-700 bg-[#0f172a] px-4 py-3 text-white outline-none focus:border-[#f59e0b] transition-colors";

  return (
    <div className="max-w-2xl">
      <Link
        to="/admin/certificates"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#f59e0b] mb-6"
      >
        <FaArrowLeft /> Back
      </Link>
      <h1 className="text-3xl font-serif font-bold mb-8">
        {isEdit ? "Edit Certificate" : "New Certificate"}
      </h1>

      {error && (
        <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
            Title *
          </label>
          <input
            required
            className={inputStyle}
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        {/* Issuer */}
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
            Issuer *
          </label>
          <input
            required
            className={inputStyle}
            value={form.issuer}
            onChange={(e) => setForm({ ...form, issuer: e.target.value })}
          />
        </div>

        {/* Date */}
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
            Date *
          </label>
          <input
            required
            className={inputStyle}
            placeholder="e.g. July 2026"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
            Description
          </label>
          <textarea
            rows="4"
            className={inputStyle + " resize-none"}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        {/* URL */}
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
            Certificate URL (Optional)
          </label>
          <input
            className={inputStyle}
            placeholder="https://..."
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
          />
        </div>

        {/* Sort Order */}
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
            Sort Order
          </label>
          <input
            type="number"
            className={inputStyle}
            value={form.sort_order}
            onChange={(e) =>
              setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })
            }
          />
        </div>

        {/* ✅ Image Upload */}
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
            Certificate Image
          </label>
          {preview ? (
            <div className="relative w-full max-w-md">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg border border-gray-700"
              />
              <button
                type="button"
                onClick={() => {
                  setImage(null);
                  setPreview("");
                }}
                className="absolute top-2 right-2 p-2 rounded-full bg-red-500 text-white hover:bg-red-600"
              >
                <FaTimes />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-[#f59e0b] bg-[#0f172a]">
              <div className="flex flex-col items-center gap-2 text-gray-500">
                <FaUpload className="text-2xl" />
                <p className="text-sm">Click to upload image</p>
                <p className="text-xs">PNG, JPG (Max 4MB)</p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            disabled={loading}
            className="rounded-lg bg-[#f59e0b] px-6 py-3 text-sm font-semibold text-black hover:bg-[#fbbf24] disabled:opacity-50"
          >
            {loading ? "Saving..." : isEdit ? "Update" : "Create"}
          </button>
          <Link
            to="/admin/certificates"
            className="rounded-lg border border-gray-700 px-6 py-3 text-sm font-semibold text-gray-400 hover:bg-gray-800"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
