// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("loginMember");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("Failed to load user from localStorage:", error);
      localStorage.removeItem("loginMember");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (userData) => {
    if (userData && typeof userData === "object") {
      setUser(userData);
      localStorage.setItem("loginMember", JSON.stringify(userData));
    } else {
      console.error("Invalid user data provided to login function");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("loginMember");
  };

  const value = {
    user,
    login,
    logout,
    isLoggedIn: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };
