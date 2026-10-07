import {
  FaHtml5,
  FaReact,
  FaCss3Alt,
  FaJs,
  FaServer,
  FaLaravel,
  FaGitAlt,
  FaCode,
  FaDatabase,
  FaPhp,
  FaJava,
} from "react-icons/fa";
import { SiTailwindcss, SiSharp } from "react-icons/si";

// ==================== ICON MAP ====================
const skillIcons = {
  html5: <FaHtml5 />,
  react: <FaReact />,
  tailwind: <SiTailwindcss />,
  javascript: <FaJs />,
  css3: <FaCss3Alt />,
  api: <FaServer />,
  laravel: <FaLaravel />,
  mysql: <FaDatabase />,
  git: <FaGitAlt />,
  php: <FaPhp />,
  java: <FaJava />,
  csharp: <SiSharp />,
};

// ==================== CATEGORY COLORS (Light + Dark) ====================
const categoryColors = {
  Frontend:
    "text-blue-600 dark:text-blue-400 border-blue-500/40 dark:border-blue-400/30",
  Backend:
    "text-emerald-600 dark:text-emerald-400 border-emerald-500/40 dark:border-emerald-400/30",
  "Tools & DevOps":
    "text-purple-600 dark:text-purple-400 border-purple-500/40 dark:border-purple-400/30",
  Other:
    "text-gray-500 dark:text-gray-400 border-gray-400/40 dark:border-gray-400/30",
};

export default function Skills({ skills }) {
  if (!skills || skills.length === 0) return null;

  // Group by category
  const groups = skills.reduce((acc, s) => {
    const key = s.category || "Other";
    (acc[key] ||= []).push(s);
    return acc;
  }, {});

  return (
    <section
      id="skills"
      className="py-32 bg-gray-50 dark:bg-[#0a0a0a] text-black dark:text-white transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-8">
        {/* ==================== HEADER ==================== */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-[#f59e0b]"></div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#f59e0b] font-medium">
              My Toolkit
            </p>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-black dark:text-white">
            Skills & Technologies
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl">
            The tools and technologies I use to build modern, scalable, and
            beautiful web applications.
          </p>
        </div>

        {/* ==================== GROUPS ==================== */}
        {Object.entries(groups).map(([category, items]) => (
          <div key={category} className="mb-16">
            {/* Category Title */}
            <div className="flex items-center gap-4 mb-8">
              <h3
                className={`text-sm uppercase tracking-[0.2em] font-semibold px-4 py-1.5 rounded-full border ${
                  categoryColors[category] || categoryColors.Other
                }`}
              >
                {category}
              </h3>
              <div className="flex-1 h-[1px] bg-gray-300 dark:bg-gray-800"></div>
            </div>

            {/* Skills Cards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((s) => (
                <div
                  key={s.id}
                  className="group relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#141414] p-6 transition-all duration-500 hover:border-[#f59e0b]/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]"
                >
                  {/* Icon & Status */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#f59e0b]/10 text-[#f59e0b] text-2xl group-hover:bg-[#f59e0b] group-hover:text-black transition-all duration-500">
                      {skillIcons[s.icon] ||
                        skillIcons[s.name?.toLowerCase()] || <FaCode />}
                    </div>
                    <span className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
                      {s.level >= 90
                        ? "Mastered"
                        : s.level >= 70
                          ? "Advanced"
                          : "Learning"}
                    </span>
                  </div>

                  {/* Name */}
                  <h4 className="text-lg font-bold text-black dark:text-white group-hover:text-[#f59e0b] transition-colors duration-300 mb-1">
                    {s.name}
                  </h4>

                  {/* Category (ជំនួស Description) */}
                  <p className="text-xs text-gray-500 mb-4 line-clamp-2">
                    {s.category
                      ? `${s.category} skill in my development toolkit.`
                      : "Core skill in my development toolkit."}
                  </p>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Proficiency</span>
                      <span className="text-[#f59e0b] font-semibold">
                        {s.level}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] transition-all duration-1000"
                        style={{ width: `${s.level}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
