import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import api from "../../services/api";

const empty = {
  name: "",
  icon: "",
  progress: 0,
  sort_order: 0,
};

export default function LearningForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEdit) {
      api.get(`/learnings/${id}`)
        .then(({ data }) => setForm(data))
        .catch(() => setError("Failed to load"));
    }
  }, [id, isEdit]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit) await api.put(`/learnings/${id}`, form);
      else await api.post("/learnings", form);
      navigate("/admin/learnings");
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
      <Link to="/admin/learnings" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#f59e0b] mb-6">
        <FaArrowLeft /> Back
      </Link>
      <h1 className="text-3xl font-serif font-bold mb-8">
        {isEdit ? "Edit" : "New"} Learning
      </h1>

      {error && (
        <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={submit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Name *</label>
          <input required className={inputStyle} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Icon Name</label>
          <input className={inputStyle} placeholder="e.g. nextjs, typescript, react" value={form.icon || ""} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Progress (0-100)</label>
          <input type="number" min="0" max="100" className={inputStyle} value={form.progress} onChange={(e) => setForm({ ...form, progress: parseInt(e.target.value) || 0 })} />
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Sort Order</label>
          <input type="number" className={inputStyle} value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} />
        </div>

        <div className="flex gap-4 pt-4">
          <button disabled={loading} className="rounded-lg bg-[#f59e0b] px-6 py-3 text-sm font-semibold text-black hover:bg-[#fbbf24] disabled:opacity-50">
            {loading ? "Saving..." : isEdit ? "Update" : "Create"}
          </button>
          <Link to="/admin/learnings" className="rounded-lg border border-gray-700 px-6 py-3 text-sm font-semibold text-gray-400 hover:bg-gray-800">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}