import { TypeAnimation } from "react-type-animation";
import {
  FaGithub,
  FaFacebookF,
  FaInstagram,
  FaTelegramPlane,
  FaArrowDown,
  FaDownload,
  FaMapMarkerAlt,
  FaPhoneAlt, // ✅ បន្ថែម
} from "react-icons/fa";

export default function Hero({ owner, projects = [], skills = [] }) {
  const name = owner?.name || "Pen Bora";
  const location = owner?.location || "Phnom Penh, Cambodia";
  const phone = owner?.phone || null; // ✅ បន្ថែម
  const projectCount = projects.length || 0;
  const skillCount = skills.length || 0;
  const yearsLearning = owner?.years_learning || 2;

  const socialLinks = owner?.social_links || [
    { platform: "github", url: "https://github.com/penbora97-hash" },
    { platform: "facebook", url: "https://www.facebook.com/share/1DiHMV5DLf/" },
    { platform: "instagram", url: "https://www.instagram.com/penbora97/" },
    { platform: "telegram", url: "https://t.me/pen_bora" },
  ];

  const iconMap = {
    github: <FaGithub />,
    facebook: <FaFacebookF />,
    instagram: <FaInstagram />,
    telegram: <FaTelegramPlane />,
  };

  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center bg-white dark:bg-[#0a0a0a] text-black dark:text-white pt-20 overflow-hidden transition-colors duration-500"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#f59e0b] rounded-full blur-[180px] opacity-[0.08] -translate-y-1/2 translate-x-1/3 -z-10"></div>

      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center w-full">
        {/* Left */}
        <div className="space-y-6">
          {/* Status Badge */}
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
            <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse"></span>
            Available for Internships & Opportunities
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-sans font-bold tracking-tight leading-[1.1] text-black dark:text-white">
            I build digital <br />
            products that feel <br />
            <span className="text-[#f59e0b]">clear & useful.</span>
          </h1>

          {/* Type Animation */}
          <div className="text-xl md:text-2xl font-light text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <span>I'm a</span>
            <span className="text-[#f59e0b] font-semibold">
              <TypeAnimation
                sequence={[
                  "Web Developer",
                  2000,
                  "Software Engineer",
                  2000,
                  "Full-Stack Developer",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                cursor={true}
              />
            </span>
          </div>

          {/* Bio */}
          <p className="text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed text-lg">
            I'm{" "}
            <span className="text-black dark:text-white font-semibold">
              {name}
            </span>
            , an IT Engineering student and full-stack developer turning ideas
            into polished web and mobile experiences.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 pt-4 border-t border-gray-200 dark:border-gray-800">
            <div>
              <p className="text-2xl font-bold text-[#f59e0b]">
                {String(projectCount).padStart(2, "0")}
              </p>
              <p className="text-xs uppercase tracking-widest text-gray-500 mt-1">
                Products Built
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#f59e0b]">{skillCount}+</p>
              <p className="text-xs uppercase tracking-widest text-gray-500 mt-1">
                Technologies
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#f59e0b]">
                {String(yearsLearning).padStart(2, "0")}
              </p>
              <p className="text-xs uppercase tracking-widest text-gray-500 mt-1">
                Years Learning
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href="#projects"
              className="flex items-center gap-2 px-6 py-3.5 bg-[#f59e0b] text-black font-semibold rounded-full hover:bg-[#fbbf24] transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.3)]"
            >
              EXPLORE MY WORK <FaArrowDown />
            </a>
            <a
              href="/Pen_Bora_CV.pdf"
              download
              className="flex items-center gap-2 px-6 py-3.5 border border-gray-300 dark:border-gray-700 text-black dark:text-white font-semibold rounded-full hover:border-[#f59e0b] hover:text-[#f59e0b] transition-all duration-300"
            >
              <FaDownload /> DOWNLOAD CV
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 pt-4">
            {socialLinks.map((s, i) => (
              <a
                key={i}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-[#f59e0b] hover:text-[#f59e0b] transition-all duration-300"
              >
                {iconMap[s.platform] || <FaGithub />}
              </a>
            ))}
          </div>

          {/* ✅ Location & Phone */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 pt-2">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-[#f59e0b]" />
              {location}
            </div>
            {phone && (
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-2 hover:text-[#f59e0b] transition-colors"
              >
                <FaPhoneAlt className="text-[#f59e0b]" />
                {phone}
              </a>
            )}
          </div>
        </div>

        {/* Right: Image */}
        <div className="flex justify-center md:justify-end relative mt-8 md:mt-0">
          <div className="relative w-[280px] h-[360px] sm:w-[320px] sm:h-[420px] md:w-[400px] md:h-[500px] lg:w-[450px] lg:h-[580px]">
            {/* Decorative Frame */}
            <div className="absolute inset-0 border border-black/10 dark:border-white/20 rounded-3xl"></div>
            <div className="absolute inset-4 border border-black/5 dark:border-white/10 rounded-3xl"></div>

            {/* Image */}
            <div className="absolute inset-8 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-900 border-2 border-black/10 dark:border-white/10">
              <img
                src={owner?.photo_url || "/me.jpg"}
                alt={name}
                className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/450x580/141414/ffffff?text=Photo";
                }}
              />
            </div>

            {/* Corner Labels */}
            <div className="hidden md:block absolute -left-4 top-1/2 -rotate-90 text-[10px] uppercase tracking-[0.3em] text-black/40 dark:text-white/60">
              Build // {new Date().getFullYear()}
            </div>
            <div className="hidden md:block absolute -right-4 top-1/2 rotate-90 text-[10px] uppercase tracking-[0.3em] text-black/30 dark:text-white/40">
              Profile // 01
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
