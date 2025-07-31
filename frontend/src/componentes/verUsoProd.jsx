import React, { useEffect, useState } from 'react';

import NavBarAdmin from './navBarAdmin';
import Aside from './aside';

function UsoProductos() {
  const [usos, setUsos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsos = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/usoproducto');
        if (!response.ok) throw new Error('No se pudo cargar el uso de productos');
        const data = await response.json();
        setUsos(data);
      } catch (err) {
        console.error(err);
        setError(err.message || 'Error al conectar con el servidor');
      }
    };
    fetchUsos();
  }, []);

  return (
    <>
    <NavBarAdmin/>
    <main >
        <section>
            <h2>Historial de Uso de Productos</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                <thead>
                <tr>
                    <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Nombre Producto</th>
                    <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Cantidad Usada</th>
                    <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Unidad</th>
                    <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Observaciones</th>
                    <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Fecha</th>
                </tr>
                </thead>
                <tbody>
                {usos.map((u) => (
                    <tr key={u._id}>
                    <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{u.nombreProducto}</td>
                    <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{u.cantidadUsada}</td>
                    <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{u.unidad}</td>
                    <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{u.observaciones}</td>
                    <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>
                        {new Date(u.fecha).toLocaleString()}
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </section>
        <Aside/>
    </main>
    </>
  );
}

export default UsoProductos;
