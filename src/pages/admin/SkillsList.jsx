import { useEffect, useState } from "react";
import api from "../../services/api";
import AdminTable from "../../components/admin/AdminTable";

export default function SkillsList() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/skills")
      .then(({ data }) => setSkills(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this skill?")) return;
    try {
      await api.delete(`/skills/${id}`);
      setSkills(skills.filter((s) => s.id !== id));
    } catch {
      alert("Failed to delete");
    }
  };

  return (
    <AdminTable
      title="Skills"
      subtitle="Manage your technical skills"
      columns={[
        { key: "name", label: "Name" },
        { key: "category", label: "Category" },
        { key: "level", label: "Level", render: (r) => `${r.level}%` },
      ]}
      data={loading ? [] : skills}
      onDelete={handleDelete}
      editPath={(id) => `/admin/skills/${id}/edit`}
      createPath="/admin/skills/new"
    />
  );
}
