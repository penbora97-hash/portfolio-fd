import { createContext, useContext, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await api.post("/login", { email, password });
      if (!data.token) {
        throw new Error("No token received from server");
      }
      localStorage.setItem("token", data.token);
      setToken(data.token);
      return data;
    } catch (err) {
      // លុប Token បើ Login បរាជ័យ
      localStorage.removeItem("token");
      setToken(null);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await api.post("/logout");
    } catch (err) {
      // មិនខ្វល់ពី Error ទេ ព្រោះយើងនឹងលុប Token នៅខាងក្រោម
      console.warn("Logout API error:", err?.response?.data?.message);
    } finally {
      // លុប Token ជាដាច់ខាត
      localStorage.removeItem("token");
      setToken(null);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuth: !!token,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
