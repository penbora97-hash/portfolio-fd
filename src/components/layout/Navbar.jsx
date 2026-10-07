import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import ThemeToggle from "../UI/ThemeToggle";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#learning", label: "Learning" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#certificates", label: "Certificates" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar({ name }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = links.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -60% 0px" },
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-md py-4 border-b border-gray-200 dark:border-gray-800"
          : "bg-transparent py-6"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-8">
        {/* Logo */}
        <a
          href="#top"
          className="text-2xl font-serif font-bold text-black dark:text-white tracking-wide"
        >
          {name || "Pen Bora"}
          <span className="text-[#f59e0b]">.</span>
        </a>

        {/* Desktop: Links + ThemeToggle */}
        <div className="hidden md:flex items-center gap-10">
          <ul className="flex gap-10">
            {links.map((l) => {
              const isActive = activeSection === l.href.replace("#", "");
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className={`text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-300 ${
                      isActive
                        ? "text-[#f59e0b]"
                        : "text-gray-600 dark:text-gray-400 hover:text-[#f59e0b]"
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              );
            })}
          </ul>
          <ThemeToggle />
        </div>

        {/* Mobile: ThemeToggle + Menu */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-black dark:text-white text-xl"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 px-8 py-6 space-y-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm uppercase tracking-[0.2em] font-medium text-gray-600 dark:text-gray-400 hover:text-[#f59e0b] transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
