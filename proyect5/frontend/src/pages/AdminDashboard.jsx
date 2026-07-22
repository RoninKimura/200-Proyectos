import { useEffect, useState, useCallback } from 'react';
import api from '../api/client';
import ItemForm from '../components/ItemForm';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [tab, setTab] = useState('weapons');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null); // null = oculto, {} = nuevo, {...} = editar
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    api.get(`/${tab}/`)
      .then((res) => { setItems(res.data.results ?? res.data); setError(''); })
      .catch(() => setError('No se pudo cargar el catálogo. Verifica tu sesión.'))
      .finally(() => setLoading(false));
  }, [tab]);

  useEffect(() => { load(); }, [load]);

  const handleSubmit = async (data) => {
    setSaving(true);
    try {
      if (editing?.id) {
        await api.put(`/${tab}/${editing.id}/`, data);
      } else {
        await api.post(`/${tab}/`, data);
      }
      setEditing(null);
      load();
    } catch (err) {
      alert('Error al guardar: ' + (err.response?.data ? JSON.stringify(err.response.data) : err.message));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item) => {
    try {
      await api.delete(`/${tab}/${item.id}/`);
      setConfirmDelete(null);
      load();
    } catch {
      alert('No se pudo eliminar el registro.');
    }
  };

  const stat_Options_Field={
    weapons:'dano',
    vehicles:'capacidad',
    // charcters: 'nombre',
  };

  const stat_Options_Label={
    weapons:'Daño' , 
    vehicles:'Capacidad',
    // charcters: 'Nombre',
  };

  const statField = stat_Options_Field[tab];
  const statLabel = stat_Options_Label[tab];

  // const statField = tab === 'weapons' ? 'dano' : 'capacidad';
  // const statLabel = tab === 'weapons' ? 'Daño' : 'Capacidad';

  return (
    <div className="wrap admin-page">
      <div className="admin-header">
        <div>
          <div className="eyebrow">Panel de administrador</div>
          <h1>Gestión del catálogo</h1>
        </div>
        {!editing && (
          <button className="btn btn-primary" onClick={() => setEditing({})}>
            + Nuevo registro
          </button>
        )}
      </div>

      <div className="tabs">
        <button
          className={`tab-btn ${tab === 'weapons' ? 'is-active' : ''}`}
          onClick={() => { setTab('weapons'); setEditing(null); }}
        >
          Armas
        </button>
        <button
          className={`tab-btn ${tab === 'vehicles' ? 'is-active' : ''}`}
          onClick={() => { setTab('vehicles'); setEditing(null); }}
        >
          Vehículos
        </button>
        <button
          className={`tab-btn ${tab === 'characters' ? 'is-active' : ''}`}
          onClick={() => { setTab('characters'); setEditing(null); }}
        >
          Personajes
        </button>
      </div>

      {editing && (
        <ItemForm
          kind={tab}
          initial={editing.id ? editing : null}
          onSubmit={handleSubmit}
          onCancel={() => setEditing(null)}
          saving={saving}
        />
      )}

      {loading && <p className="status-msg">Cargando registros…</p>}
      {error && <p className="status-msg error-text">{error}</p>}

      {!loading && !error &&(
        <div className="admin-table-wrap hud-panel">
          
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>{statLabel}</th>
                <th>Fecha</th>
                <th aria-label="Acciones"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.nombre}</td>
                  <td>{item.tipo_display}</td>
                  <td className="mono">{item[statField]}</td>
                  <td className="mono">{item.fecha_introduccion}</td>
                  <td className="admin-row-actions">
                    <button className="btn btn-ghost btn-sm" onClick={() => setEditing(item)}>Editar</button>
                    {confirmDelete === item.id ? (
                      <>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item)}>Confirmar</button>
                        <button className="btn btn-ghost btn-sm" onClick={() => setConfirmDelete(null)}>Cancelar</button>
                      </>
                    ) : (
                      <button className="btn btn-danger btn-sm" onClick={() => setConfirmDelete(item.id)}>Eliminar</button>
                    )}
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr><td colSpan={5} className="status-msg">No hay registros todavía.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
