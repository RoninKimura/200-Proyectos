import { useState, useEffect } from 'react';

const WEAPON_TYPES = [
  ['rifle_asalto', 'Rifle de asalto'],
  ['rifle_battle', 'Battle Rifle'],
  ['pistola', 'Pistola'],
  ['escopeta', 'Escopeta'],
  ['francotirador', 'Rifle de francotirador'],
  ['energia', 'Arma de energía (Covenant/Forerunner)'],
  ['explosivo', 'Lanzacohetes / Explosivo'],
  ['cuerpo_a_cuerpo', 'Cuerpo a cuerpo'],
];

const VEHICLE_TYPES = [
  ['terrestre', 'Terrestre'],
  ['aereo', 'Aéreo'],
  ['acuatico', 'Acuático/Anfibio'],
  ['espacial', 'Nave espacial'],
];

const CHARACTER_TYPES=[
   ['humano','Humano'],
   ['inteligencia_artificial','Inteligencia Artificial'],
   ['elites','Sangheili'],
   ['grunts','Unggoy'],
   ['brutes','Jiralhanae'],
   ['prophets','San\'Shyuum'],
];

const emptyWeapon = { nombre: '', tipo: 'rifle_asalto', dano: '', fecha_introduccion: '', descripcion: '', imagen_url: '' };
const emptyVehicle = { nombre: '', tipo: 'terrestre', capacidad: '', fecha_introduccion: '', descripcion: '', imagen_url: '' };
const emptyCharacter = { nombre: '', especie: 'humano', fecha_introduccion: '', descripcion: '', imagen_url: '' };

export default function ItemForm({ kind, initial, onSubmit, onCancel, saving }) {
  const isWeapon = kind === 'weapons';
  const type_Options_By_Kind={
    weapons: WEAPON_TYPES,
    vehicles: VEHICLE_TYPES,
    characters: CHARACTER_TYPES,
  };
  const typeOptions = type_Options_By_Kind[kind];

  const stat_Options_Field={
    weapons:'dano',
    vehicles:'capacidad',
  };

  const stat_Options_Label={
    weapons:'Daño estimado' , 
    vehicles:'Capacidad (tripulantes)',
  };

  const statField = stat_Options_Field[kind];
  const statLabel = stat_Options_Label[kind];

  const empy_By_Kind={
    weapons: emptyWeapon,
    vehicles: emptyVehicle,
    characters: emptyCharacter,
  }

  const [form, setForm] = useState(initial || (empy_By_Kind[kind]));
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(initial || (empy_By_Kind[kind]));
    setErrors({});
  }, [initial, kind]);

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
  };

  const validate = () => {
    const errs = {};
    if (!form.nombre.trim()) errs.nombre = 'El nombre es obligatorio.';
    if (form[statField] === '' || Number(form[statField]) < 0) errs[statField] = 'Ingresa un valor numérico válido.';
    if (!form.fecha_introduccion) errs.fecha_introduccion = 'La fecha es obligatoria.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ 
      ...form,
      ... (statField ?{[statField]: Number(form[statField]) }:{}),
    });
  };

  return (
    <form className="item-form hud-panel" onSubmit={handleSubmit}>
      <h3>{initial ? 'Editar registro' : 'Nuevo registro'}</h3>

      <div className="field">
        <label htmlFor="nombre">Nombre</label>
        <input id="nombre" value={form.nombre} onChange={handleChange('nombre')} />
        {errors.nombre && <span className="error-text">{errors.nombre}</span>}
      </div>

      <div className="field">
        <label htmlFor="tipo">Tipo</label>
        <select id="tipo" value={form.tipo} onChange={handleChange('tipo')}>
          {typeOptions.map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      {statField &&(
        <div className="field">
          <label htmlFor="stat">{statLabel}</label>
          <input
            id="stat"
            type="number"
            min="0"
            value={form[statField]}
            onChange={handleChange(statField)}
          />
          {errors[statField] && <span className="error-text">{errors[statField]}</span>}
        </div>
      )}

      <div className="field">
        <label htmlFor="fecha">Fecha de introducción</label>
        <input id="fecha" type="date" value={form.fecha_introduccion} onChange={handleChange('fecha_introduccion')} />
        {errors.fecha_introduccion && <span className="error-text">{errors.fecha_introduccion}</span>}
      </div>

      <div className="field">
        <label htmlFor="descripcion">Descripción</label>
        <textarea id="descripcion" value={form.descripcion} onChange={handleChange('descripcion')} />
      </div>

      <div className="field">
        <label htmlFor="imagen_url">URL de imagen (opcional)</label>
        <input id="imagen_url" value={form.imagen_url} onChange={handleChange('imagen_url')} placeholder="https://…" />
      </div>

      <div className="item-form-actions">
        <button type="button" className="btn btn-ghost" onClick={onCancel} disabled={saving}>Cancelar</button>
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? 'Guardando…' : 'Guardar registro'}
        </button>
      </div>
    </form>
  );
}
