import { useEffect, useState } from "react";
import api from "../../services/api";
import AdminTable from "../../components/admin/AdminTable";

// Helper សម្រាប់ Format Date
const formatDate = (d) => {
  if (!d) return "Present";
  try {
    return new Date(d).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  } catch {
    return "—";
  }
};

export default function ExperienceList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/experiences")
      .then(({ data }) => setData(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this experience?")) return;
    try {
      await api.delete(`/experiences/${id}`);
      setData(data.filter((d) => d.id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete");
    }
  };

  return (
    <AdminTable
      title="Experiences"
      subtitle="Manage your work experience"
      columns={[
        { key: "position", label: "Position" },
        { key: "company", label: "Company" },
        {
          key: "start_date",
          label: "Start Date",
          render: (r) => formatDate(r.start_date),
        },
        {
          key: "end_date",
          label: "End Date",
          render: (r) => formatDate(r.end_date),
        },
      ]}
      data={loading ? [] : data}
      onDelete={handleDelete}
      editPath={(id) => `/admin/experiences/${id}/edit`}
      createPath="/admin/experiences/new"
    />
  );
}
