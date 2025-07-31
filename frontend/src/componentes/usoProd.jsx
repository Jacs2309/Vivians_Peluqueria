import React, { useState } from 'react';
import NavBarEmp from './navBarEmp';
import Aside from './aside';

function RegistrarUso() {
  const [nombreProducto, setNombreProducto] = useState('');
  const [cantidadUsada, setCantidadUsada] = useState('');
  const [unidad, setUnidad] = useState('mg');
  const [fecha, setFechaUso] = useState('');
  const [observaciones, setObservaciones] = useState('');

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    try {
      //Buscar producto por nombre
      const resProducto = await fetch(`http://localhost:5000/api/inventario/buscar?nombre=${encodeURIComponent(nombreProducto)}`);
      if (!resProducto.ok) throw new Error('No se pudo buscar el producto');
      const producto = await resProducto.json();

      if (!producto || producto.length === 0) {
        setError('El producto no existe en el inventario');
        return;
      }
      console.log(producto);

      const prod = producto[0]; // suponiendo que devuelve un array con los productos encontrados

      //Verificar stock
      if (prod.cantidad < parseFloat(cantidadUsada)) {
        setError('No hay suficiente stock para registrar este uso');
        return;
      }

      //Actualizar stock
      const nuevaCantidad = prod.cantidad - parseFloat(cantidadUsada);
      const resUpdate = await fetch(`http://localhost:5000/api/inventario/uso/${prod._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cantidad: nuevaCantidad })
      });

      if (!resUpdate.ok) {
        const data = await resUpdate.json();
        throw new Error(data.error || 'Error al actualizar el inventario');
      }
      //guardar uso
    
      const response = await fetch('http://localhost:5000/api/usoproducto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombreProducto,
          cantidadUsada,
          unidad,
          observaciones,
          fecha
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Error al registrar el uso');
      }

      setSuccess('Uso registrado correctamente');
      // Opcionalmente limpiar campos
      setNombreProducto('');
      setCantidadUsada('');
      setUnidad('mg');
      setFechaUso('');
      setObservaciones('');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Error al conectar con el servidor');
    }
  };

  const handleClear = () => {
    setNombreProducto('');
    setCantidadUsada('');
    setUnidad('mg');
    setFechaUso('');
    setObservaciones('');
    setError('');
    setSuccess('');
  };

  return (
    <>
    <NavBarEmp/>
    <main>
    <section >
      <h2 style={{ textAlign: 'center' }}>Registrar Uso de Productos</h2>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {success && <p style={{ color: 'green', textAlign: 'center' }}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Nombre del Producto</label><br/>
          <input
            type="text"
            value={nombreProducto}
            onChange={(e) => setNombreProducto(e.target.value)}
            placeholder="name..."
            style={{ width: '100%' }}
            required
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Cantidad Usada</label><br/>
          <input
            type="number"
            value={cantidadUsada}
            onChange={(e) => setCantidadUsada(e.target.value)}
            style={{ width: '60%' }}
            required
          />
          <select value={unidad} onChange={(e) => setUnidad(e.target.value)} style={{ marginLeft: '0.5rem' }}>
            <option value="ml">ml</option>
            <option value="Cajas">Cajas</option>
            <option value="Botellas">Botellas</option>
            <option value="Frascos">Frascos</option>
            <option value="Tubos">Tubos</option>
            <option value="Unidades">Unidades</option>
          </select>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Fecha de Uso</label><br/>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFechaUso(e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Observaciones</label><br/>
          <textarea
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
            style={{ width: '100%', height: '80px' }}
            placeholder="Escribe observaciones aquí..."
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
          <button type="submit" style={{ width: '50%' }}>Registrar</button>
          <button type="button" onClick={handleClear} style={{ width: '50%' }}>Limpiar</button>
        </div>
      </form>
    </section>
    <Aside/>
    </main>
    </>
    
  );
}

export default RegistrarUso;
