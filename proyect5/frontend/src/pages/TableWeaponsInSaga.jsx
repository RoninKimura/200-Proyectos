import { useEffect, useState } from 'react';
import api from '../api/client';
import './AdminDashboard.css';

export default function TableSaga(){
  const [tab, setTab] = useState('weapons');
  const [sagas, setSagas] = useState([]);
  const [weapons, setWeapons] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
  Promise.all([api.get('/sagas/'), api.get('/weapons/')])
    .then(([sagasRes, weaponsRes]) => {
      setSagas(sagasRes.data.results ?? sagasRes.data);
      setWeapons(weaponsRes.data.results ?? weaponsRes.data);
    })
    .catch(() => setError('No se pudo cargar la matriz.'));
  }, []);

  function armaEstaEnSaga(saga, weaponId) {
    return saga.armas_disponibles.some((arma) => arma.id === weaponId);
  }

  return(
    <table className="admin-table">
      <thead>
        <tr>
          <th>Saga</th>
          {weapons.map((arma)=>
            <th key={arma.id}>{arma.nombre}</th>
          )}
        </tr>
      </thead>
      <tbody>
        {sagas.map((saga)=>
          <tr key={saga.id}>
            <td>{saga.nombre}</td>
            {weapons.map((arma)=>
              <td key={arma.id}>{armaEstaEnSaga(saga,arma.id)?'✓':''}</td>
            )}
          </tr>
        )}
      </tbody>
    </table>
  )
};