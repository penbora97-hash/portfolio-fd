import { useEffect, useState } from "react";
import api from "../../services/api";
import AdminTable from "../../components/admin/AdminTable";

export default function CertificatesList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/certificates")
      .then(({ data }) => setData(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this certificate?")) return;
    try {
      await api.delete(`/certificates/${id}`);
      setData(data.filter((d) => d.id !== id));
    } catch {
      alert("Failed to delete");
    }
  };

  return (
    <AdminTable
      title="Certificates"
      subtitle="Manage your certificates and credentials"
      columns={[
        { key: "title", label: "Title" },
        { key: "issuer", label: "Issuer" },
        { key: "date", label: "Date" },
        {
          key: "image_path",
          label: "Image",
          render: (r) =>
            r.image_path ? (
              <img
                src={`${import.meta.env.VITE_STORAGE_URL}/${r.image_path}`}
                alt={r.title}
                className="w-16 h-12 object-cover rounded"
              />
            ) : (
              <span className="text-gray-500 text-xs">No image</span>
            ),
        },
      ]}
      data={loading ? [] : data}
      onDelete={handleDelete}
      editPath={(id) => `/admin/certificates/${id}/edit`}
      createPath="/admin/certificates/new"
    />
  );
}
    