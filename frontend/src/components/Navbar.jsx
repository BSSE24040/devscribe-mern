import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "../styles/Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Dev<span>Scribe</span>
        </Link>

        <nav className="navbar-links">
          <Link to="/">Home</Link>

          {user ? (
            <>
              <Link to="/create">Write</Link>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/profile" className="navbar-avatar-link">
                {user.avatar?.url ? (
                  <img src={user.avatar.url} alt={user.name} className="navbar-avatar" />
                ) : (
                  <span className="navbar-avatar-placeholder">
                    {user.name?.charAt(0).toUpperCase()}
                  </span>
                )}
              </Link>
              <button onClick={handleLogout} className="navbar-logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register" className="navbar-cta">
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
