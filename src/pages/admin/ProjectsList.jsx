import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import api from "../../services/api";

export default function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const { data } = await api.get("/projects");
      setProjects(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;
    try {
      await api.delete(`/projects/${id}`);
      setProjects(projects.filter((p) => p.id !== id));
    } catch (err) {
      alert("Failed to delete project");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold">Projects</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your portfolio projects
          </p>
        </div>
        <Link
          to="/admin/projects/new"
          className="flex items-center gap-2 rounded-lg bg-[#84cc16] px-5 py-2.5 text-sm font-semibold text-black hover:bg-[#65a30d] transition-all duration-300"
        >
          <FaPlus /> New Project
        </Link>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-gray-700 rounded-2xl">
          <p className="text-gray-500">
            No projects yet. Create your first one!
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gray-800 bg-[#111827]">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-800 text-xs uppercase tracking-widest text-gray-500">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {projects.map((p) => (
                <tr
                  key={p.id}
                  className="hover:bg-gray-800/50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-white">
                    {p.title}
                  </td>
                  <td className="px-6 py-4 text-gray-400 line-clamp-1">
                    {p.description}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <Link
                        to={`/admin/projects/${p.id}/edit`}
                        className="p-2 rounded-lg text-blue-400 hover:bg-blue-500/10 transition-colors"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
