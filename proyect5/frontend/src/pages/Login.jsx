import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const userData = await login(username, password);
      if (!userData.is_staff) {
        setError('Esta cuenta no tiene permisos de administrador.');
        setLoading(false);
        return;
      }
      const dest = location.state?.from || '/admin';
      navigate(dest, { replace: true });
    } catch (err) {
      setError(
        err.response?.status === 401
          ? 'Usuario o contraseña incorrectos.'
          : 'No se pudo conectar con el servidor. Intenta de nuevo.'
      );
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="wrap login-wrap">
        <form className="login-panel hud-panel" onSubmit={handleSubmit}>
          <div className="eyebrow">Acceso restringido</div>
          <h1>Panel de administrador</h1>
          <p className="login-sub">Ingresa tus credenciales para gestionar el catálogo táctico.</p>

          <div className="field">
            <label htmlFor="username">Usuario</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          {error && <p className="error-text login-error">{error}</p>}

          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? 'Verificando…' : 'Iniciar sesión'}
          </button>
        </form>
      </div>
    </div>
  );
}
