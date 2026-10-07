import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-700 text-gray-400 hover:border-[#f59e0b] hover:text-[#f59e0b] transition-all duration-300"
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? <FaSun /> : <FaMoon />}
    </button>
  );
}