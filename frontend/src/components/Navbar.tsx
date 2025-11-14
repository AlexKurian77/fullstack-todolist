import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="navbar-content">
        <div className="navbar-brand">
          <span className="brand-icon">📋</span>
          <h2 className="brand-name">TodoApp</h2>
        </div>

        <div className="navbar-actions">
          <div className="user-greeting">
            <div className="user-avatar">
              <img 
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=667eea&color=fff&bold=true&size=40`}
                alt={user?.name || 'User'}
                className="avatar-image"
              />
            </div>
            <div className="user-info">
              <p className="greeting-text">Welcome back,</p>
              <p className="user-name">{user?.name || "User"}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="logout-button">
            <span>🚪</span>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
