import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function AdminTable({
  title,
  subtitle,
  columns,
  data,
  onDelete,
  editPath,
  createPath,
}) {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white">{title}</h1>
          <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
        </div>
        {createPath && (
          <Link
            to={createPath}
            className="rounded-lg bg-[#f59e0b] px-5 py-2.5 text-sm font-semibold text-black hover:bg-[#fbbf24] transition-all duration-300"
          >
            + New
          </Link>
        )}
      </div>

      {/* Table */}
      {data.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-gray-700 rounded-2xl">
          <p className="text-gray-500">No data yet.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gray-800 bg-[#111827]">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-800 text-xs uppercase tracking-widest text-gray-500">
              <tr>
                {columns.map((col) => (
                  <th key={col.key} className="px-6 py-4">
                    {col.label}
                  </th>
                ))}
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {data.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-gray-800/50 transition-colors"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-6 py-4 text-gray-300">
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      {editPath && (
                        <Link
                          to={editPath(row.id)}
                          className="p-2 rounded-lg text-blue-400 hover:bg-blue-500/10 transition-colors"
                        >
                          <FaEdit />
                        </Link>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(row.id)}
                          className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                          <FaTrash />
                        </button>
                      )}
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
