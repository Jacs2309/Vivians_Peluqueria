import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import esmalte from '../assets/inicio/esmalte.png'
import sh from '../assets/inicio/shampoo.jpeg'
import uñas from '../assets/inicio/uñas.jpg'
import acond from '../assets/inicio/acond.jpeg'
import tinte from '../assets/inicio/tinte.jpeg'
import aceite from '../assets/inicio/aceite.png'

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
    <nav>
        <div>
            <ul className="nav-menu">
                <li className="nav-item">
                <Link to={'/vivians/inicio'}>Cerrar sesion</Link>
                </li>
                <li className="nav-item">
                <Link to={'/vivians/admin'}>Inventario</Link>
                </li>
                <li className="nav-item">
                <Link to={'/vivians/admin/users'}>Gestion de usuarios</Link>
                </li>
                <li className="nav-item">
                <Link to={'/vivians/admin/notificaciones'}>Notificaciones</Link>
                </li>
            </ul>
        </div>
    </nav>
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
    <aside>
    <h2>Nuestros Productos</h2>
    <div className="product-grid">
        <div>
        <img src={esmalte} className="placeholder" alt="Producto" />
        <p>Esmaltes</p>
        </div>
        <div>
        <img src={sh} className="placeholder" alt="Producto" />
        <p>Shampoo</p>
        </div>
        <div>
        <img src={uñas} className="placeholder" alt="Producto" />
        <p>Uñas Acrilicas</p>
        </div>
        <div>
        <img src={acond} className="placeholder" alt="Producto" />
        <p>Acondicionador</p>
        </div>
        <div>
        <img src={tinte} className="placeholder" alt="Producto" />
        <p>Tintes para Cabello</p>
        </div>
        <div>
        <img src={aceite} className="placeholder" alt="Producto" />
        <p>Aceites hidratantes</p>
        </div>
    </div>
    </aside>
    </main>
    </>
  );
}

export default Notificaciones;
