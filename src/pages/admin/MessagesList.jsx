import { useEffect, useState } from "react";
import { FaEnvelopeOpen, FaTrash } from "react-icons/fa";
import api from "../../services/api";

export default function MessagesList() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    api
      .get("/contact-messages")
      .then(({ data }) => setMessages(data))
      .catch(console.error);
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete?")) return;
    await api.delete(`/contact-messages/${id}`);
    setMessages(messages.filter((m) => m.id !== id));
  };

  const handleRead = async (id) => {
    await api.patch(`/contact-messages/${id}/read`);
    setMessages(
      messages.map((m) => (m.id === id ? { ...m, is_read: true } : m)),
    );
  };

  return (
    <div>
      <h1 className="text-3xl font-serif font-bold mb-8">Messages</h1>
      {messages.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-gray-700 rounded-2xl">
          <p className="text-gray-500">No messages yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`rounded-2xl border ${m.is_read ? "border-gray-800 bg-[#111827]" : "border-[#f59e0b]/30 bg-[#f59e0b]/5"} p-6`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-white">{m.name}</h3>
                    <span className="text-xs text-gray-500">{m.email}</span>
                    {!m.is_read && (
                      <span className="text-xs bg-[#f59e0b] text-black px-2 py-0.5 rounded">
                        NEW
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[#f59e0b] mb-1">{m.subject}</p>
                  <p className="text-sm text-gray-400">{m.message}</p>
                </div>
                <div className="flex gap-2">
                  {!m.is_read && (
                    <button
                      onClick={() => handleRead(m.id)}
                      className="p-2 rounded-lg text-blue-400 hover:bg-blue-500/10"
                    >
                      <FaEnvelopeOpen />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(m.id)}
                    className="p-2 rounded-lg text-red-400 hover:bg-red-500/10"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
