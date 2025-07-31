import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import NavBarAdmin from './navBarAdmin';
import Aside from './aside';


function EditarProducto() {
  const { id } = useParams();
  

  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [unidad, setUnidad] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('');
  const [nivelminimo, setNivelminimo] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Cargar datos del producto al montar
  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/inventario/${id}`);
        if (!response.ok) throw new Error('Error al obtener producto');
        const data = await response.json();

        setNombre(data.nombre);
        setCantidad(data.cantidad);
        setUnidad(data.unidad);
        setPrecio(data.precio);
        setCategoria(data.categoria);
        setNivelminimo(data.nivelminimo);
      } catch (err) {
        console.error(err);
        setError(err.message || 'Error al conectar con el servidor');
      }
    };

    fetchProducto();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`http://localhost:5000/api/inventario/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre,
          cantidad: Number(cantidad),
          unidad,
          precio: Number(precio),
          categoria,
          nivelminimo: Number(nivelminimo)
        })
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Error al actualizar producto');
        return;
      }

      setSuccess('Producto actualizado exitosamente');
      // Opcional: redirigir de vuelta
      // navigate('/ruta/del/inventario');
    } catch (err) {
      console.error(err);
      setError('Error al conectar con el servidor');
    }
  };

  return (
    <>
    <NavBarAdmin/>
    <main>
    <section>
      <h2 style={{ textAlign: 'center' }}>Editar Producto</h2>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {success && <p style={{ color: 'green', textAlign: 'center' }}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </div>
        <div>
          <label>Cantidad:</label>
          <input type="number" value={cantidad} onChange={(e) => setCantidad(e.target.value)} required />
        </div>
        <div>
          <label>Unidad:</label>
          <input type="text" value={unidad} onChange={(e) => setUnidad(e.target.value)} required />
        </div>
        <div>
          <label>Precio:</label>
          <input type="number" step="0.01" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
        </div>
        <div>
          <label>Categoría:</label>
          <input type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} required />
        </div>
        <div>
          <label>Nivel mínimo:</label>
          <input type="number" value={nivelminimo} onChange={(e) => setNivelminimo(e.target.value)} required />
        </div>

        <button type="submit">Guardar cambios</button>
      </form>

    
    </section>
    <Aside/>
    </main>
    </> 
  );
}

export default EditarProducto;
