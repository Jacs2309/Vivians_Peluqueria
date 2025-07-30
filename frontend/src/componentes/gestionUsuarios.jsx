import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import esmalte from '../assets/inicio/esmalte.png'
import sh from '../assets/inicio/shampoo.jpeg'
import uñas from '../assets/inicio/uñas.jpg'
import acond from '../assets/inicio/acond.jpeg'
import tinte from '../assets/inicio/tinte.jpeg'
import aceite from '../assets/inicio/aceite.png'

function GestUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users');
      if (!response.ok) {
        throw new Error('Error al obtener usuarios');
      }
      const data = await response.json();
      setUsuarios(data);
    } catch (err) {
      console.error(err);
      setError('No se pudo cargar la lista de usuarios');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este usuario?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Error al eliminar usuario');
        return;
      }

      // Recargar la lista tras eliminar
      cargarUsuarios();
    } catch (err) {
      console.error(err);
      setError('Error al conectar con el servidor');
    }
  };

  const handleEdit = (id) => {
    // Aquí puedes navegar a una página de edición o abrir un modal
    console.log('Editar usuario con ID:', id);
    navigate(`${id}`);
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
        <section style={{paddingLeft:'3.5vh'}}>
        <h2>Usuarios</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <table style={{borderCollapse: 'collapse' }}>
            <thead>
            <tr>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Nombre</th>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Correo</th>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Tipo</th>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Acciones</th>
            </tr>
            </thead>
            <tbody>
            {usuarios.map((user) => (
                <tr key={user._id}>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{user.nombre}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{user.correo}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{user.tipo}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                    <button className='boton' onClick={() => handleEdit(user._id)} style={{ marginRight: '0.5rem' }}>Editar</button>
                    <button className='boton' onClick={() => handleDelete(user._id)} >Eliminar</button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
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

export default GestUsuarios;
