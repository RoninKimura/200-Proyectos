import './SpecCard.css';

/**
 * Tarjeta de especificación estilo HUD para un arma o vehículo.
 * statLabel/statValue: la métrica principal (Daño o Capacidad) mostrada como barra.
 */
export default function SpecCard({ item, statLabel, statMax = 100, actions }) {
  const statValue = item.dano ?? item.capacidad;
  const tineStat=statValue !== undefined;
  const pct = tineStat ? Math.min(100, Math.round((statValue / statMax) * 100)) : 0;
  const isHigh = pct >= 70;
  

  return (
    <article className="spec-card hud-panel">
      <div className="spec-card-head">
        <span className="spec-type">{item.tipo_display}</span>
        <span className="spec-id">#{String(item.id).padStart(3, '0')}</span>
      </div>

      <h3 className="spec-name">{item.nombre}</h3>

      <p className="spec-desc">{item.descripcion || 'Sin registro adicional en la base de datos.'}</p>

      {tineStat &&(
        <div className="spec-stat">
          <div className="spec-stat-labels">
            <span>{statLabel}</span>
            <span className="spec-stat-value">{statValue}</span>
          </div>
          <div className="spec-stat-track">
            <div
              className={`spec-stat-fill ${isHigh ? 'is-high' : ''}`}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      )}

      <div className="spec-card-footer">
        <span className="spec-date">Introducido: {item.fecha_introduccion}</span>
      </div>

      {actions && <div className="spec-card-actions">{actions}</div>}
    </article>
  );
}
