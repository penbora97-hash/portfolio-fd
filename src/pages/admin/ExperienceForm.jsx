import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import api from "../../services/api";

const empty = {
  company: "",
  position: "",
  start_date: "",
  end_date: "",
  description: "",
};

export default function ExperienceForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEdit) {
      api
        .get(`/experiences/${id}`)
        .then(({ data }) => setForm(data))
        .catch(() => setError("Failed"));
    }
  }, [id, isEdit]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit) await api.put(`/experiences/${id}`, form);
      else await api.post("/experiences", form);
      navigate("/admin/experiences");
    } catch (err) {
      setError(err.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "w-full rounded-lg border border-gray-700 bg-[#0f172a] px-4 py-3 text-white outline-none focus:border-[#f59e0b] transition-colors";

  return (
    <div className="max-w-2xl">
      <Link
        to="/admin/experiences"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#f59e0b] mb-6"
      >
        <FaArrowLeft /> Back
      </Link>
      <h1 className="text-3xl font-serif font-bold mb-8">
        {isEdit ? "Edit" : "New"} Experience
      </h1>

      {error && (
        <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={submit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
            Position *
          </label>
          <input
            required
            className={inputStyle}
            value={form.position}
            onChange={(e) => setForm({ ...form, position: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
            Company *
          </label>
          <input
            required
            className={inputStyle}
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
              Start Date
            </label>
            <input
              type="date"
              className={inputStyle}
              value={form.start_date}
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
        <div className="flex gap-4 pt-4">
          <button
            disabled={loading}
            className="rounded-lg bg-[#f59e0b] px-6 py-3 text-sm font-semibold text-black hover:bg-[#fbbf24] disabled:opacity-50"
          >
            {loading ? "Saving..." : isEdit ? "Update" : "Create"}
          </button>
          <Link
            to="/admin/experiences"
            className="rounded-lg border border-gray-700 px-6 py-3 text-sm font-semibold text-gray-400 hover:bg-gray-800"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
