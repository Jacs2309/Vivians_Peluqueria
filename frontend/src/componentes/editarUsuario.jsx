import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import NavBarAdmin from './navBarAdmin';
import Aside from './aside';

function EditarU() {
  const { id } = useParams();
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [tipo, setTipo] = useState('empleado'); // valor por defecto

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const cargarUsuario = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${id}`);
        if (!response.ok) {
          throw new Error('No se pudo obtener el usuario');
        }
        const data = await response.json();
        setNombre(data.nombre || '');
        setCorreo(data.correo || '');
        setTipo(data.tipo || 'empleado'); // por defecto empleado
        // Opcionalmente puedes dejar la contraseña en blanco por seguridad
        setContraseña(data.contraseña || '');
        setConfirmarContraseña('');
      } catch (err) {
        console.error(err);
        setError('Error al cargar el usuario');
      }
    };

    cargarUsuario();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validación local: confirmar contraseña
    if (contraseña !== confirmarContraseña) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, correo, contraseña, tipo }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Error al Actualizar usuario');
        return;
      }

      setSuccess('Usuario actualizado exitosamente');
      // Limpiar campos
      setNombre('');
      setCorreo('');
      setContraseña('');
      setConfirmarContraseña('');
      setTipo('empleado');
    } catch (err) {
      console.error(err);
      setError('Error al conectar con el servidor');
    }
  };

  return (
    <>
    <NavBarAdmin/>
    <main >
        <section>
            <h2>Actualizar Usuario</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                <label>Nombre: </label>
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
                </div>

                <div>
                <label>Correo: </label>
                <input
                    type="email"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                />
                </div>

                <div>
                <label>Contraseña: </label>
                <input
                    type="password"
                    value={contraseña}
                    onChange={(e) => setContraseña(e.target.value)}
                    required
                />
                </div>

                <div>
                <label>Confirmar Contraseña: </label>
                <input
                    type="password"
                    value={confirmarContraseña}
                    onChange={(e) => setConfirmarContraseña(e.target.value)}
                    required
                />
                </div>

                <div>
                <label>Tipo:</label>
                <div>
                    <label>
                    <input
                        type="radio"
                        value="admin"
                        checked={tipo === 'admin'}
                        onChange={(e) => setTipo(e.target.value)}
                    />
                    Admin
                    </label>
                    <label style={{ marginLeft: '1rem' }}>
                    <input
                        type="radio"
                        value="empleado"
                        checked={tipo === 'empleado'}
                        onChange={(e) => setTipo(e.target.value)}
                    />
                    Empleado
                    </label>
                </div>
                </div>

                <button type="submit">Registrar</button>
            </form>
        </section>
        <Aside/>
    </main>
    </>
  );
}

export default EditarU;
