import { useEffect, useState } from "react";
import api from "../../services/api";
import AdminTable from "../../components/admin/AdminTable";

export default function LearningList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/learnings")
      .then(({ data }) => setData(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      await api.delete(`/learnings/${id}`);
      setData(data.filter((d) => d.id !== id));
    } catch {
      alert("Failed to delete");
    }
  };

  return (
    <AdminTable
      title="Currently Learning"
      subtitle="Manage your learning progress"
      columns={[
        { key: "name", label: "Name" },
        { key: "progress", label: "Progress", render: (r) => `${r.progress}%` },
        { key: "sort_order", label: "Order" },
      ]}
      data={loading ? [] : data}
      onDelete={handleDelete}
      editPath={(id) => `/admin/learnings/${id}/edit`}
      createPath="/admin/learnings/new"
    />
  );
}
