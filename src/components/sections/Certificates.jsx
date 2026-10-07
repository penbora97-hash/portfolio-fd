import { useState, useEffect } from "react";
import { FaCertificate, FaExternalLinkAlt, FaTimes } from "react-icons/fa";

export default function Certificates({ certificates = [] }) {
  const [selectedImage, setSelectedImage] = useState(null);

  // បិទ Modal ពេលចុច Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  // បិទ Scroll ពេល Modal បើក
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  if (!certificates || certificates.length === 0) return null;

  return (
    <>
      <section
        id="certificates"
        className="py-32 bg-white dark:bg-[#0a0a0a] text-black dark:text-white transition-colors duration-500"
      >
        <div className="max-w-7xl mx-auto px-8">
          {/* Header */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-[1px] w-12 bg-[#f59e0b]"></div>
              <p className="text-sm uppercase tracking-[0.3em] text-[#f59e0b] font-medium">
                Credentials
              </p>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-black dark:text-white">
              Certificates
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl">
              Certifications and training I've completed.
            </p>
          </div>

          {/* Grid */}
          <div className="grid gap-8 md:grid-cols-2">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="group rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#141414] overflow-hidden transition-all duration-500 hover:border-[#f59e0b]/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]"
              >
                {/* Image - ចុចបាន */}
                {cert.image_path ? (
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedImage(
                        `${import.meta.env.VITE_STORAGE_URL}/${cert.image_path}`,
                      )
                    }
                    className="relative h-64 w-full overflow-hidden bg-gray-100 dark:bg-gray-900 block group/img cursor-zoom-in"
                  >
                    <img
                      src={`${import.meta.env.VITE_STORAGE_URL}/${cert.image_path}`}
                      alt={cert.title}
                      className="h-full w-full object-contain bg-gray-50 dark:bg-gray-950 transition-transform duration-700 group-hover/img:scale-105"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/600x400/e5e7eb/f59e0b?text=Certificate";
                      }}
                    />
                    {/* Overlay Hint */}
                    <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/30 transition-all duration-300 flex items-center justify-center">
                      <span className="opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 text-white text-xs uppercase tracking-widest bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full">
                        Click to view
                      </span>
                    </div>
                  </button>
                ) : (
                  <div className="flex h-48 items-center justify-center bg-gray-100 dark:bg-gray-900">
                    <FaCertificate className="text-5xl text-[#f59e0b]/30" />
                  </div>
                )}

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#f59e0b]/10 text-[#f59e0b] text-2xl">
                      <FaCertificate />
                    </div>
                    <span className="text-xs uppercase tracking-widest text-[#f59e0b]">
                      {cert.date}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-black dark:text-white group-hover:text-[#f59e0b] transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-[#f59e0b] mt-1">{cert.issuer}</p>
                  <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {cert.description}
                  </p>

                  {cert.url && (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#f59e0b] hover:text-black dark:hover:text-white transition-colors"
                    >
                      <FaExternalLinkAlt className="text-xs" />
                      Verify Certificate
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== MODAL ==================== */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 md:top-8 md:right-8 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#f59e0b] text-white hover:text-black transition-all duration-300 text-xl z-10"
            aria-label="Close"
          >
            <FaTimes />
          </button>

          {/* Image */}
          <img
            src={selectedImage}
            alt="Certificate"
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Hint */}
          <p className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-xs uppercase tracking-widest">
            Click anywhere or press ESC to close
          </p>
        </div>
      )}
    </>
  );
}
