import { useEffect, useState } from "react";
import api from "../../services/api";
import AdminTable from "../../components/admin/AdminTable";

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
    if (!window.confirm("Delete?")) return;
    try {
      await api.delete(`/experiences/${id}`);
      setData(data.filter((d) => d.id !== id));
    } catch {
      alert("Failed");
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
          label: "Start",
          render: (r) => new Date(r.start_date).toLocaleDateString(),
        },
      ]}
      data={loading ? [] : data}
      onDelete={handleDelete}
      editPath={(id) => `/admin/experiences/${id}/edit`}
      createPath="/admin/experiences/new"
    />
  );
}
