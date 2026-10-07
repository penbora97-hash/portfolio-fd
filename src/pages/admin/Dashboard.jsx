import { useEffect, useState } from "react";
import api from "../../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    messages: 0,
  });

  useEffect(() => {
    // ទាញយកចំនួនពិតពី Backend
    Promise.all([
      api.get("/projects"),
      api.get("/skills"),
      api.get("/contact-messages"),
    ])
      .then(([p, s, m]) =>
        setStats({
          projects: p.data.length,
          skills: s.data.length,
          messages: m.data.length,
        }),
      )
      .catch(console.error);
  }, []);

  const cards = [
    { label: "Projects", value: stats.projects },
    { label: "Skills", value: stats.skills },
    { label: "Messages", value: stats.messages },
  ];

  return (
    <div>
      <h1 className="text-3xl font-serif font-bold mb-2">Dashboard</h1>
      <p className="text-sm text-gray-500 mb-10">
        Overview of your portfolio content
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-gray-800 bg-[#111827] p-6 transition-all duration-300 hover:border-[#84cc16]/50"
          >
            <h3 className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
              {card.label}
            </h3>
            <p className="mt-3 text-4xl font-bold text-[#84cc16]">
              {card.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
