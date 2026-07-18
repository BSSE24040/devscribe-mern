import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

// Custom hook so components can do: const { user, login, logout } = useAuth();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On first load, restore the user session from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("devscribe_user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    localStorage.setItem("devscribe_user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("devscribe_user");
    setUser(null);
  };

  // Updates just the profile fields (name, bio, avatar) while keeping the same token
  const updateUser = (updatedFields) => {
    const merged = { ...user, ...updatedFields };
    localStorage.setItem("devscribe_user", JSON.stringify(merged));
    setUser(merged);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
