import { useState } from "react";
import { sendContact } from "../../services/portfolioService";
import {
  FaPaperPlane,
  FaUser,
  FaEnvelope,
  FaTag,
  FaCommentDots,
  FaGithub,
  FaFacebookF,
  FaInstagram,
  FaTelegramPlane,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

const empty = { name: "", email: "", subject: "", message: "" };

// ==================== SOCIAL ICONS ====================
const socialIcons = {
  github: <FaGithub />,
  facebook: <FaFacebookF />,
  instagram: <FaInstagram />,
  telegram: <FaTelegramPlane />,
};

export default function Contact({ socialLinks = [] }) {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", text: "" });
    try {
      const res = await sendContact(form);
      setStatus({
        type: "success",
        text: res.message || "Message sent successfully!",
      });
      setForm(empty);
    } catch (err) {
      const msg =
        err.response?.data?.message || "Something went wrong. Try again.";
      setStatus({ type: "error", text: msg });
    } finally {
      setLoading(false);
    }
  };

  // ==================== INPUT STYLE (Light + Dark) ====================
  const inputStyle =
    "w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#0f172a] px-4 py-3 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 outline-none transition-all duration-300 focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b]/50";

  return (
    <section
      id="contact"
      className="py-32 bg-white dark:bg-[#0a0a0a] text-black dark:text-white transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-8">
        {/* ==================== HEADER ==================== */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-[#f59e0b]"></div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#f59e0b] font-medium">
              Get In Touch
            </p>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-black dark:text-white">
            Contact Me
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl">
            Have a project in mind or want to collaborate? Send me a message and
            I'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-5">
          {/* ==================== LEFT: FORM ==================== */}
          <form onSubmit={submit} className="lg:col-span-3 space-y-5">
            {/* Name & Email */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[#f59e0b] text-sm" />
                <input
                  className={`${inputStyle} pl-11`}
                  name="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-[#f59e0b] text-sm" />
                <input
                  className={`${inputStyle} pl-11`}
                  name="email"
                  type="email"
                  placeholder="Your email"
                  value={form.email}
                  onChange={onChange}
                  required
                />
              </div>
            </div>

            {/* Subject */}
            <div className="relative">
              <FaTag className="absolute left-4 top-1/2 -translate-y-1/2 text-[#f59e0b] text-sm" />
              <input
                className={`${inputStyle} pl-11`}
                name="subject"
                placeholder="Subject"
                value={form.subject}
                onChange={onChange}
              />
            </div>

            {/* Message */}
            <div className="relative">
              <FaCommentDots className="absolute left-4 top-4 text-[#f59e0b] text-sm" />
              <textarea
                className={`${inputStyle} pl-11 resize-none`}
                name="message"
                rows="6"
                placeholder="Your message..."
                value={form.message}
                onChange={onChange}
                required
              />
            </div>

            {/* Status Message */}
            {status.text && (
              <div
                className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-sm ${
                  status.type === "success"
                    ? "border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400"
                    : "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400"
                }`}
              >
                {status.type === "success" ? (
                  <FaCheckCircle />
                ) : (
                  <FaExclamationCircle />
                )}
                {status.text}
              </div>
            )}

            {/* Submit Button */}
            <button
              disabled={loading}
              className="flex items-center gap-2 rounded-full bg-[#f59e0b] px-8 py-3.5 font-semibold text-black hover:bg-[#fbbf24] transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaPaperPlane />
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>

          {/* ==================== RIGHT: INFO ==================== */}
          <div className="lg:col-span-2 space-y-8">
            {/* Info Card */}
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#141414] p-8 transition-colors duration-500">
              <h3 className="text-xl font-serif font-bold text-black dark:text-white mb-6">
                Let's Connect
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                I'm currently available for freelance work and open to new
                opportunities. Feel free to reach out through any of the
                platforms below.
              </p>

              {/* Social Links */}
              {socialLinks.length > 0 && (
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
                    Social Links
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {socialLinks.map((s) => (
                      <a
                        key={s.id}
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        title={s.platform}
                        className="w-11 h-11 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-[#f59e0b] hover:text-[#f59e0b] transition-all duration-300 text-lg"
                      >
                        {socialIcons[s.platform?.toLowerCase()] || (
                          <FaPaperPlane />
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Availability Badge */}
            <div className="rounded-2xl border border-[#f59e0b]/30 bg-[#f59e0b]/5 p-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse"></span>
                <p className="text-sm font-semibold text-[#f59e0b] uppercase tracking-widest">
                  Available
                </p>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Open for internships and full-time opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
