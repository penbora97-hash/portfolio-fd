import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

export default function Projects({ projects }) {
  return (
    <section
      id="projects"
      className="py-32 bg-white dark:bg-[#0a0a0a] text-black dark:text-white transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-[#f59e0b]"></div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#f59e0b] font-medium">
              My Work
            </p>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-black dark:text-white">
            Projects
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl">
            A selection of projects I've built to sharpen my skills and solve
            real-world problems.
          </p>
        </div>

        {/* Empty State */}
        {projects.length === 0 && (
          <div className="text-center py-20 border border-dashed border-gray-300 dark:border-gray-800 rounded-2xl">
            <p className="text-gray-500">No projects yet.</p>
          </div>
        )}

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, index) => (
            <article
              key={p.id}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#141414] transition-all duration-500 hover:border-[#f59e0b]/50 hover:shadow-[0_0_40px_rgba(245,158,11,0.15)]"
            >
              <div className="absolute top-4 left-4 z-10">
                <span className="text-5xl font-serif font-bold text-black/5 dark:text-white/10 group-hover:text-[#f59e0b]/20 transition-colors duration-500">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Thumbnail */}
              <div className="relative h-56 w-full overflow-hidden bg-gray-200 dark:bg-gray-900">
                {p.thumbnail ? (
                  <img
                    src={`${import.meta.env.VITE_STORAGE_URL}/${p.thumbnail}`}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/400x300/e5e7eb/f59e0b?text=No+Image";
                    }}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-gray-500 dark:text-gray-600 text-sm">
                    No image
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-[#141414] via-transparent to-transparent opacity-80"></div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-bold text-black dark:text-white group-hover:text-[#f59e0b] transition-colors duration-300">
                  {p.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {p.description}
                </p>

                {p.skills && p.skills.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.skills.map((s) => (
                      <span
                        key={s.id}
                        className="rounded-full border border-gray-300 dark:border-gray-800 px-3 py-1 text-xs text-gray-600 dark:text-gray-400 transition-colors duration-300 group-hover:border-[#f59e0b]/30 group-hover:text-[#f59e0b]"
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-auto pt-6 flex items-center gap-4">
                  {p.demo_url && (
                    <a
                      href={p.demo_url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-sm font-medium text-[#f59e0b] hover:text-black dark:hover:text-white transition-colors duration-300"
                    >
                      <FaExternalLinkAlt className="text-xs" />
                      View Project
                    </a>
                  )}
                  
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
