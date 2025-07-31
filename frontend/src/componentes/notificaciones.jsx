import React, { useEffect, useState } from 'react';
import NavBarAdmin from './navBarAdmin';
import Aside from './aside';

function Notificaciones() {
  const [notificaciones, setNotificaciones] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNotificaciones = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/notificacion');
        if (!response.ok) {
          throw new Error('Error al obtener notificaciones');
        }
        const data = await response.json();
        setNotificaciones(data);
      } catch (err) {
        console.error(err);
        setError(err.message || 'Error al conectar con el servidor');
      }
    };

    fetchNotificaciones();
  }, []);

  return (
    <>
    <NavBarAdmin/>
    <main>
    <section>
      <h2 style={{ textAlign: 'center' }}>Notificaciones de Stock Bajo</h2>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      {notificaciones.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No hay notificaciones</p>
      ) : (
        <table style={{ borderCollapse: 'collapse', marginLeft:'1.5rem'}}>
          <thead>
            <tr style={{ background: '#eee' }}>

              <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Mensaje</th>
              <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Fecha</th>
            </tr>
          </thead>
          <tbody>
                {notificaciones.map((n) => (
                    <tr key={n._id}>
                    <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>
                        {n.mensaje}
                    </td>
                    <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>
                        {new Date(n.createdAt).toLocaleString()} {/* muestra fecha legible */}
                    </td>
                    </tr>
                ))}
            </tbody>
        </table>
      )}
    </section>
    <Aside/>
    </main>
    </>
  );
}

export default Notificaciones;
