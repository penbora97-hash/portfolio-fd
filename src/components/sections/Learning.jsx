import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiReact,
  SiNodedotjs,
  SiLaravel,
  SiMysql,
  SiVuedotjs,
  SiJavascript,
  SiPhp,
} from "react-icons/si";
import { FaCode, FaPython } from "react-icons/fa";

// ==================== ICON MAP ====================
const learningIcons = {
  nextjs: <SiNextdotjs />,
  typescript: <SiTypescript />,
  tailwind: <SiTailwindcss />,
  react: <SiReact />,
  nodejs: <SiNodedotjs />,
  laravel: <SiLaravel />,
  mysql: <SiMysql />,
  vue: <SiVuedotjs />,
  javascript: <SiJavascript />,
  php: <SiPhp />,
  python: <FaPython />,
};

export default function Learning({ learnings = [] }) {
  if (!learnings || learnings.length === 0) return null;

  return (
    <section
      id="learning"
      className="py-32 bg-gray-50 dark:bg-[#0a0a0a] text-black dark:text-white transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-[#f59e0b]"></div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#f59e0b] font-medium">
              Growth Mindset
            </p>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-black dark:text-white">
            Currently Learning
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl">
            Technologies I'm actively learning and improving.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {learnings.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#141414] p-6 hover:border-[#f59e0b]/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] transition-all duration-500"
            >
              {/* Icon */}
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#f59e0b]/10 text-[#f59e0b] text-2xl mb-4 group-hover:bg-[#f59e0b] group-hover:text-black transition-all duration-500">
                {learningIcons[item.icon?.toLowerCase()] || <FaCode />}
              </div>

              {/* Name */}
              <h3 className="font-bold text-black dark:text-white group-hover:text-[#f59e0b] transition-colors duration-300 mb-4">
                {item.name}
              </h3>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Progress</span>
                  <span className="text-[#f59e0b] font-semibold">
                    {item.progress}%
                  </span>
                </div>
                <div className="h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] transition-all duration-1000"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
