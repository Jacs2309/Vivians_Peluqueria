import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import esmalte from '../assets/inicio/esmalte.png'
import sh from '../assets/inicio/shampoo.jpeg'
import uñas from '../assets/inicio/uñas.jpg'
import acond from '../assets/inicio/acond.jpeg'
import tinte from '../assets/inicio/tinte.jpeg'
import aceite from '../assets/inicio/aceite.png'

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

export default EditarProducto;
