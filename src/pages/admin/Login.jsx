import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaEnvelope, FaLock } from "react-icons/fa";

export default function Login() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/admin");
    } catch {
      setError("Invalid email or password");
    }
  };

  const inputStyle =
    "w-full rounded-lg border border-gray-700 bg-[#0f172a] pl-11 pr-4 py-3 text-white placeholder-gray-600 outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b]/50 transition-all duration-300";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-md space-y-6 rounded-2xl border border-gray-800 bg-[#111827] p-10 shadow-2xl"
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-serif font-bold text-white">
            Admin Login
          </h1>
          <p className="text-sm text-gray-500">
            Enter your credentials to access the dashboard
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Email */}
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
            Email
          </label>
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-[#f59e0b] text-sm" />
            <input
              type="email"
              className={inputStyle}
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
            Password
          </label>
          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#f59e0b] text-sm" />
            <input
              type="password"
              className={inputStyle}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-[#f59e0b] py-3 font-semibold text-black hover:bg-[#fbbf24] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Hint */}
        <p className="text-center text-xs text-gray-600 pt-2">
          Demo: penbora@gmail.com / password123
        </p>
      </form>
    </div>
  );
}
