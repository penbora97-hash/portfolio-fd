import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import api from "../../services/api";

const empty = { school: "", degree: "", start_date: "", end_date: "" };

export default function EducationForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEdit) {
      api
        .get(`/education/${id}`)
        .then(({ data }) => setForm(data))
        .catch(() => setError("Failed to load education"));
    }
  }, [id, isEdit]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit) await api.put(`/education/${id}`, form);
      else await api.post("/education", form);
      navigate("/admin/education");
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
        to="/admin/education"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#f59e0b] mb-6"
      >
        <FaArrowLeft /> Back
      </Link>

      <h1 className="text-3xl font-serif font-bold mb-8">
        {isEdit ? "Edit" : "New"} Education
      </h1>

      {error && (
        <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={submit} className="space-y-6">
        {/* Degree */}
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
            Degree *
          </label>
          <input
            required
            className={inputStyle}
            value={form.degree}
            onChange={(e) => setForm({ ...form, degree: e.target.value })}
            placeholder="e.g. Bachelor of Science in Software Engineering"
          />
        </div>

        {/* School */}
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
            School *
          </label>
          <input
            required
            className={inputStyle}
            value={form.school}
            onChange={(e) => setForm({ ...form, school: e.target.value })}
            placeholder="e.g. Royal University of Phnom Penh"
          />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
              Start Date
            </label>
            <input
              type="date"
              className={inputStyle}
              value={form.start_date || ""}
              onChange={(e) => setForm({ ...form, start_date: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
              End Date
            </label>
            <input
              type="date"
              className={inputStyle}
              value={form.end_date || ""}
              onChange={(e) => setForm({ ...form, end_date: e.target.value })}
            />
          </div>
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
            to="/admin/education"
            className="rounded-lg border border-gray-700 px-6 py-3 text-sm font-semibold text-gray-400 hover:bg-gray-800"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
