import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import NavBarAdmin from './navBarAdmin';
import Aside from './aside';

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
    <NavBarAdmin/>
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
        <Aside/>
    </main>
    
    </>
  );
}

export default GestUsuarios;
