import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaUpload, FaTimes } from "react-icons/fa";
import api from "../../services/api";

export default function ProfileForm() {
  const [form, setForm] = useState({
    name: "",
    headline: "",
    bio: "",
    phone: "",
    location: "",
    years_learning: 0,
  });
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/profile").then(({ data }) => {
      setForm({
        name: data.name || "",
        headline: data.headline || "",
        bio: data.bio || "",
        phone: data.phone || "",
        location: data.location || "",
        years_learning: data.years_learning || 0,
      });

      // ✅ បង្ហាញ Avatar
      if (data.photo_url) {
        const url = data.photo_url.startsWith("http")
          ? data.photo_url
          : `${import.meta.env.VITE_STORAGE_URL}/${data.photo_url}`;
        setPreview(url);
      }
    });
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveAvatar = () => {
    setAvatar(null);
    setPreview("");
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData();
    Object.entries(form).forEach(([k, v]) => {
      if (v !== null && v !== undefined) {
        formData.append(k, v);
      }
    });
    if (avatar) formData.append("avatar", avatar);

    try {
      await api.post("/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess("Profile updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "w-full rounded-lg border border-gray-700 bg-[#0f172a] px-4 py-3 text-white outline-none focus:border-[#f59e0b] transition-colors";

  return (
    <div className="max-w-2xl">
      <Link
        to="/admin"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#f59e0b] mb-6"
      >
        <FaArrowLeft /> Back
      </Link>
      <h1 className="text-3xl font-serif font-bold mb-8">Edit Profile</h1>

      {success && (
        <div className="mb-6 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400">
          {success}
        </div>
      )}

      {error && (
        <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={submit} className="space-y-6">
        {/* Avatar */}
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
            Avatar
          </label>
          {preview ? (
            <div className="relative w-32 h-32">
              <img
                src={preview}
                alt="preview"
                className="w-32 h-32 rounded-full object-cover border-2 border-[#f59e0b]/30"
              />
              <button
                type="button"
                onClick={handleRemoveAvatar}
                className="absolute top-0 right-0 p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                <FaTimes className="text-xs" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-700 rounded-full cursor-pointer hover:border-[#f59e0b] transition-colors">
              <FaUpload className="text-gray-500" />
              <span className="text-xs text-gray-500 mt-1">Upload</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </label>
          )}
        </div>

        {/* Name */}
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
            Name
          </label>
          <input
            className={inputStyle}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        {/* Headline */}
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
            Headline
          </label>
          <input
            className={inputStyle}
            value={form.headline}
            onChange={(e) => setForm({ ...form, headline: e.target.value })}
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
            Phone
          </label>
          <input
            className={inputStyle}
            placeholder="+855 12 345 678"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
            Location
          </label>
          <input
            className={inputStyle}
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
        </div>

        {/* Bio */}
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
            Bio
          </label>
          <textarea
            rows="4"
            className={inputStyle + " resize-none"}
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
          />
        </div>

        {/* Years Learning */}
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
            Years Learning
          </label>
          <input
            type="number"
            className={inputStyle}
            value={form.years_learning}
            onChange={(e) =>
              setForm({
                ...form,
                years_learning: parseInt(e.target.value) || 0,
              })
            }
          />
        </div>

        <button
          disabled={loading}
          className="rounded-lg bg-[#f59e0b] px-6 py-3 text-sm font-semibold text-black hover:bg-[#fbbf24] disabled:opacity-50"
        >
          {loading ? "Saving..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}
