import { FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

export default function About({ owner }) {
  const name = owner?.name || "Pen Bora";
  const email = owner?.email || "penbora@gmail.com";
  const location = owner?.location || "Phnom Penh, Cambodia";
  const role = owner?.role || owner?.headline || "Software Engineering Student";
  const bio =
    owner?.bio ||
    "I am a passionate Software Engineering student and aspiring Full-Stack Developer based in Phnom Penh, Cambodia. I love turning complex problems into simple, beautiful, and intuitive designs.";

  return (
    <section
      id="about"
      className="py-32 bg-white dark:bg-[#0a0a0a] relative text-black dark:text-white transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-12 gap-16">
        {/* Title */}
        <div className="md:col-span-4">
          <div className="sticky top-32">
            <h2 className="text-4xl font-serif text-black dark:text-white mb-4">
              About Me
            </h2>
            <div className="h-[2px] w-16 bg-[#f59e0b]"></div>

            <div className="hidden md:block mt-12 space-y-6">
              <div>
                <h4 className="text-xs uppercase tracking-widest text-[#f59e0b] font-semibold mb-2">
                  Role
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {role}
                </p>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest text-[#f59e0b] font-semibold mb-2">
                  Focus
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Full-Stack Development
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="md:col-span-8 space-y-8">
          <p className="text-2xl text-black dark:text-white leading-relaxed font-light">
            Hello, I'm{" "}
            <span className="font-semibold text-[#f59e0b]">{name}</span>. I'm a
            Software Engineering student and aspiring Full-Stack Developer based
            in {location}. I enjoy building modern, responsive web applications
            and creating digital experiences that are both beautiful and
            functional.
          </p>

          <div className="space-y-6 text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
            <p>{bio}</p>
            <p>
              I have experience working with HTML, CSS, JavaScript, React,
              Tailwind CSS, PHP, Laravel, C#, Java, and MySQL. I'm especially
              interested in Full-Stack Development, Web Applications, UI/UX,
              APIs, and Database Systems.
            </p>
            <p>
              I enjoy turning ideas into practical projects and learning new
              technologies through hands-on development. My goal is to grow into
              a professional Software Engineer who can build reliable, scalable,
              and meaningful software.
            </p>
          </div>

          {/* Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-start gap-4">
              <span className="text-[#f59e0b] text-xl mt-1">
                <FaMapMarkerAlt />
              </span>
              <div>
                <h4 className="text-sm uppercase tracking-widest text-black dark:text-white font-semibold mb-1">
                  Location
                </h4>
                <p className="text-gray-600 dark:text-gray-400">{location}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-[#f59e0b] text-xl mt-1">
                <FaEnvelope />
              </span>
              <div>
                <h4 className="text-sm uppercase tracking-widest text-black dark:text-white font-semibold mb-1">
                  Email
                </h4>
                <a
                  href={`mailto:${email}`}
                  className="text-gray-600 dark:text-gray-400 hover:text-[#f59e0b] transition-colors"
                >
                  {email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
