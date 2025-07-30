import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import esmalte from '../assets/inicio/esmalte.png'
import sh from '../assets/inicio/shampoo.jpeg'
import uñas from '../assets/inicio/uñas.jpg'
import acond from '../assets/inicio/acond.jpeg'
import tinte from '../assets/inicio/tinte.jpeg'
import aceite from '../assets/inicio/aceite.png'

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
      const resProducto = await fetch(`http://localhost:5000/api/inventario?nombre=${encodeURIComponent(nombreProducto)}`);
      if (!resProducto.ok) throw new Error('No se pudo buscar el producto');
      const producto = await resProducto.json();

      if (!producto || producto.length === 0) {
        setError('El producto no existe en el inventario');
        return;
      }

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
    <nav>
        <ul className="nav-menu">
            <li className="nav-item">
            <Link to={'/vivians/inicio'}>Cerrar sesion</Link>
            </li>
            <li className="nav-item">
            <Link to={'/vivians/empleado'}>Inventario</Link>
            </li>
            <li className="nav-item">
            <Link to={'/vivians/empleado/registraruso'}>regsitrar uso Producto</Link>
            </li>
        </ul>
    </nav>
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
            <option value="mg">mg</option>
            <option value="ml">ml</option>
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

export default RegistrarUso;
