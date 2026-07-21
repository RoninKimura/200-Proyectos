import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="wrap navbar-inner">
        <NavLink to="/" className="brand">
          <span className="brand-mark">◆</span>
          HALO ARMORY
          <span className="brand-sub">// DB TÁCTICA</span>
        </NavLink>
        <nav className="nav-links">
          <NavLink to="/" end>Catálogo</NavLink>
          {isAuthenticated && user?.is_staff ? (
            <>
              <NavLink to="/admin">Panel Admin</NavLink>
              <button className="btn btn-ghost btn-sm" onClick={handleLogout}>
                Salir ({user.username})
              </button>
            </>
          ) : (
            <NavLink to="/login" className="btn btn-primary btn-sm nav-cta">
              Acceso Admin
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}
