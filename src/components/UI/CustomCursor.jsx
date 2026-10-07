import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // មិនបង្ហាញនៅលើ Mobile
    if (window.matchMedia("(max-width: 768px)").matches) return;

    const move = (e) => setPosition({ x: e.clientX, y: e.clientY });

    const over = (e) => {
      const target = e.target;
      setIsHovering(
        target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          target.closest("a") ||
          target.closest("button"),
      );
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <>
      {/* Inner Dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          transform: `translate(${position.x - 4}px, ${position.y - 4}px)`,
          transition: "transform 0.02s linear",
        }}
      >
        <div
          className={`rounded-full bg-[#f59e0b] transition-all duration-200 ${
            isHovering ? "w-2 h-2" : "w-2 h-2"
          }`}
        />
      </div>

      {/* Outer Ring */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:block"
        style={{
          transform: `translate(${position.x - 16}px, ${position.y - 16}px)`,
          transition: "transform 0.08s ease-out",
        }}
      >
        <div
          className={`rounded-full border-2 transition-all duration-200 ${
            isHovering
              ? "w-12 h-12 border-[#f59e0b] bg-[#f59e0b]/10"
              : "w-8 h-8 border-gray-500"
          }`}
        />
      </div>
    </>
  );
}
