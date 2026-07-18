import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

// Wraps a page and redirects to /login if there is no logged-in user
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null; // avoid flicker while we check localStorage

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
