import { useEffect, useState } from 'react';
import api from '../api/client';
import SpecCard from '../components/SpecCard';
import './Home.css';

export default function Home() {
  const [tab, setTab] = useState('weapons');
  const [weapons, setWeapons] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);
    Promise.all([api.get('/weapons/'), api.get('/vehicles/')])
      .then(([wRes, vRes]) => {
        if (!active) return;
        setWeapons(wRes.data.results ?? wRes.data);
        setVehicles(vRes.data.results ?? vRes.data);
        setError('');
      })
      .catch(() => {
        if (active) setError('No se pudo conectar con la base de datos táctica. Verifica que el backend esté activo.');
      })
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, []);

  const items = tab === 'weapons' ? weapons : vehicles;

  return (
    <div className="home">
      <section className="hero">
        <div className="wrap hero-inner">
          <div className="eyebrow">Base de datos táctica — Halo Universe</div>
          <h1>Cada arma. Cada vehículo. <span className="accent">Un solo registro.</span></h1>
          <p className="hero-lead">
            Halo Armory cataloga el equipamiento de la UNSC y el Covenant con especificaciones
            verificadas: daño, capacidad y fecha de introducción en combate.
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-num">{weapons.length}</span>
              <span className="hero-stat-label">Armas registradas</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-num">{vehicles.length}</span>
              <span className="hero-stat-label">Vehículos registrados</span>
            </div>
          </div>
        </div>
      </section>

      <section className="catalog wrap">
        <div className="tabs" role="tablist">
          <button
            role="tab"
            aria-selected={tab === 'weapons'}
            className={`tab-btn ${tab === 'weapons' ? 'is-active' : ''}`}
            onClick={() => setTab('weapons')}
          >
            Armas ({weapons.length})
          </button>
          <button
            role="tab"
            aria-selected={tab === 'vehicles'}
            className={`tab-btn ${tab === 'vehicles' ? 'is-active' : ''}`}
            onClick={() => setTab('vehicles')}
          >
            Vehículos ({vehicles.length})
          </button>
        </div>

        {loading && <p className="status-msg">Consultando la base de datos táctica…</p>}
        {error && <p className="status-msg error-text">{error}</p>}

        {!loading && !error && items.length === 0 && (
          <p className="status-msg">Aún no hay registros en esta categoría.</p>
        )}

        {!loading && !error && items.length > 0 && (
          <div className="spec-grid">
            {items.map((item) => (
              <SpecCard
                key={item.id}
                item={item}
                statLabel={tab === 'weapons' ? 'Daño' : 'Capacidad'}
                statMax={tab === 'weapons' ? 100 : 10}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
