import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  FaTachometerAlt,
  FaFolder,
  FaCode,
  FaBriefcase,
  FaGraduationCap,
  FaCertificate,
  FaEnvelope,
  FaBookOpen,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

const menuItems = [
  { to: "/admin", label: "Dashboard", icon: <FaTachometerAlt />, end: true },
  { to: "/admin/projects", label: "Projects", icon: <FaFolder /> },
  { to: "/admin/skills", label: "Skills", icon: <FaCode /> },
  { to: "/admin/experiences", label: "Experiences", icon: <FaBriefcase /> },
  { to: "/admin/education", label: "Education", icon: <FaGraduationCap /> },
  { to: "/admin/certificates", label: "Certificates", icon: <FaCertificate /> },
  { to: "/admin/learnings", label: "Learning", icon: <FaBookOpen /> },
  { to: "/admin/messages", label: "Messages", icon: <FaEnvelope /> },
  { to: "/admin/profile", label: "Profile", icon: <FaUser /> },
];

export default function AdminLayout() {
  const { logout, loading } = useAuth(); // ✅ ទាញ loading

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error(err);
    } finally {
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#111827] border-r border-gray-800 flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-xl font-serif font-bold">
            Admin<span className="text-[#f59e0b]">.</span>
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-[#84cc16] text-black"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

       
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            disabled={loading}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaSignOutAlt />
            {loading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
