import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white px-4">
      <div className="text-center space-y-6">
        <h1 className="text-9xl font-serif font-bold text-[#f59e0b]">404</h1>
        <h2 className="text-2xl font-bold">Page Not Found</h2>
        <p className="text-gray-400 max-w-md">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-[#f59e0b] px-6 py-3 font-semibold text-black hover:bg-[#fbbf24] transition-all duration-300"
        >
          <FaHome /> Back to Home
        </Link>
      </div>
    </div>
  );
}
