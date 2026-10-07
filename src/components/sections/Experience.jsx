import { FaBriefcase, FaGraduationCap } from "react-icons/fa";

const fmt = (d) =>
  d
    ? new Date(d).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : "Present";

function ExperienceCard({ item }) {
  return (
    <div className="group relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#141414] p-6 transition-all duration-500 hover:border-[#f59e0b]/50 hover:shadow-[0_0_40px_rgba(245,158,11,0.1)]">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs uppercase tracking-[0.2em] text-[#f59e0b] font-semibold">
          {fmt(item.start_date)} — {fmt(item.end_date)}
        </span>
      </div>
      <h4 className="text-xl font-bold text-black dark:text-white group-hover:text-[#f59e0b] transition-colors duration-300">
        {item.position}
      </h4>
      <p className="text-sm text-[#f59e0b] font-medium mt-1">{item.company}</p>
      {item.description && (
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {item.description}
        </p>
      )}
    </div>
  );
}

function EducationCard({ item }) {
  return (
    <div className="group relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#141414] p-6 transition-all duration-500 hover:border-[#f59e0b]/50 hover:shadow-[0_0_40px_rgba(245,158,11,0.1)]">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs uppercase tracking-[0.2em] text-[#f59e0b] font-semibold">
          {fmt(item.start_date)} — {fmt(item.end_date)}
        </span>
      </div>
      <h4 className="text-xl font-bold text-black dark:text-white group-hover:text-[#f59e0b] transition-colors duration-300">
        {item.degree}
      </h4>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
        {item.school}
      </p>
      {item.description && (
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {item.description}
        </p>
      )}
    </div>
  );
}

function Timeline({ title, subtitle, icon, items, type }) {
  return (
    <div>
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#f59e0b]/10 text-[#f59e0b] text-xl">
          {icon}
        </div>
        <div>
          <h3 className="text-2xl font-serif font-bold text-black dark:text-white">
            {title}
          </h3>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>

      {!items || items.length === 0 ? (
        <p className="text-gray-500 text-sm">No data yet.</p>
      ) : (
        <ol className="relative space-y-8 border-l-2 border-gray-200 dark:border-gray-800 pl-8">
          {items.map((item) => (
            <li key={item.id} className="relative">
              <span className="absolute -left-[41px] top-6 h-4 w-4 rounded-full bg-[#f59e0b] ring-4 ring-[#f59e0b]/10 transition-all duration-300 hover:ring-[#f59e0b]/30" />
              {type === "experience" ? (
                <ExperienceCard item={item} />
              ) : (
                <EducationCard item={item} />
              )}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export default function Experience({ experiences = [], education = [] }) {
  return (
    <section
      id="experience"
      className="py-32 bg-gray-50 dark:bg-[#0a0a0a] text-black dark:text-white transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-[#f59e0b]"></div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#f59e0b] font-medium">
              My Journey
            </p>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-black dark:text-white">
            Experience & Education
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl">
            My professional training, internship experience, and development
            journey as a Software Engineering student.
          </p>
        </div>

        <div className="grid gap-16 lg:grid-cols-2">
          <Timeline
            title="Experience"
            subtitle="Professional training & internship"
            icon={<FaBriefcase />}
            items={experiences}
            type="experience"
          />
          <Timeline
            title="Education"
            subtitle="Academic background & development"
            icon={<FaGraduationCap />}
            items={education}
            type="education"
          />
        </div>
      </div>
    </section>
  );
}
