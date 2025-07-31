import React, { useEffect, useState } from 'react';
import NavBarEmp from './navBarEmp';
import Aside from './aside';

function InventarioE() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/inventario');
        if (!response.ok) {
          throw new Error('Error al obtener productos');
        }
        const data = await response.json();
        setProductos(data);
      } catch (err) {
        console.error(err);
        setError('No se pudo cargar el inventario');
      }
    };

    fetchProductos();
  }, []);

  return (
   <>
   <NavBarEmp/>
    <main>
    <section style={{paddingLeft:'3.5vh'}}>
      <h2>Inventario</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

       {productos.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No hay productos</p>
      ) : (
        <table style={{borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#eee' }}>
              <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Nombre</th>
              <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Cantidad</th>
              <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Unidad</th>
              <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Precio</th>
              <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Categoría</th>
              <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Nivel mínimo</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto._id}>
                <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{producto.nombre}</td>
                <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{producto.cantidad}</td>
                <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{producto.unidad}</td>
                <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>${producto.precio.toFixed(2)}</td>
                <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{producto.categoria}</td>
                <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{producto.nivelminimo}</td>
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

export default InventarioE;
