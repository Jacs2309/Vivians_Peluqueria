import NavBarInicio from './navBarInicio';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, contraseña }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Error al iniciar sesión');
        return;
      }

      const user = await response.json();

      localStorage.setItem('usuario', JSON.stringify(user));

      if (user.tipo === 'admin') {
        navigate('/vivians/admin');
      } else if (user.tipo === 'empleado') {
        navigate('/vivians/empleado');
      } else {
        setError('Tipo de usuario desconocido');
      }
    } catch (err) {
      console.error(err);
      setError('Error al conectar con el servidor');
    }
  };

  return (
    <>
    <NavBarInicio/>
    <main style={{justifyContent:'center'}}>
        <section style={{margin:'0'}}>
            <h2>Iniciar Sesión</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit} className="form">
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

                <button  type="submit">Entrar</button>
            </form>
            </section>
    </main>
    </>
  );
}

export default Login;
