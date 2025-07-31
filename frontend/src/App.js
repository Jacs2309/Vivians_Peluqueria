import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Inicio from "./componentes/inicio";
import Login from "./componentes/iniciarSesion";
import Registro from "./componentes/registro";
import InventarioA from "./componentes/inventarioA";
import InventarioE from "./componentes/inventarioE";
import GestUsuarios from "./componentes/gestionUsuarios";
import EditarU from "./componentes/editarUsuario";
import RegistrarUso from "./componentes/usoProd";
import Notificaciones from "./componentes/notificaciones";
import EditarProducto from "./componentes/editarProd";
import UsoProductos from "./componentes/verUsoProd";
import InicioA from "./componentes/inicioA";
import InicioE from "./componentes/inicioE";
import logo from './assets/logo.png';
import './App.css';


function App() {
  
  return (
    <>
    <BrowserRouter>
      <header>
        <img src={logo} style={{width:'22vh', height:'15vh', paddingRight:'36vh', paddingLeft:'20vh'}} alt="logo"/>
        <div style={{textAlign: 'center', marginLeft: '3vh'}}>
          <h2>Vivian´s Peluquieria</h2>
          <h3>Salón de belleza</h3>
        </div>
      </header>
        <Routes>
          <Route path="/" element={<Navigate to="/vivians/inicio" replace />} />
          <Route path="/vivians/inicio" element = {<Inicio/>}/>
          <Route path="/vivinas/iniciarsesion" element={ <Login/>}/>
          <Route path="/vivians/registrar" element = {<Registro/>}/>
          <Route path="/vivians/empleado" element = {<InicioE/>}/>
          <Route path="/vivians/empleado/inventario" element = {<InventarioE/>}/>
          <Route path="/vivians/empleado/registraruso" element = {<RegistrarUso/>}/>
          <Route path="/vivians/admin" element = {<InicioA/>}/>
          <Route path="/vivians/admin/inventario" element = {<InventarioA/>}/>
          <Route path="/vivians/admin/users" element = {<GestUsuarios/>}/>
          <Route path="/vivians/admin/users/:id" element = {<EditarU/>}/>
          <Route path="/vivians/admin/notificaciones" element = {<Notificaciones/>}/>
          <Route path="/vivians/admin/inventario/editarProducto/:id" element = {<EditarProducto/>}/>
          <Route path="/vivians/admin/usoprod" element = {<UsoProductos/>}/>
         
        </Routes>       
      <footer>
        <div className="footer-links">
          <p>Redes Sociales</p>
          <a href="https://www.facebook.com/profile.php?id=100067029313431&locale=es_LA">Facebook</a>
          <a href="https://www.instagram.com/?flo=true">Instagram</a>
        </div>
        <img className="placeholder" alt="Logo o imagen" style={{width:'22vh', height:'10vh'}} src={logo}></img>
        <div>
          <p>Dirección<br/>Vivian's<br/>Viñedos y Venezuela</p>
          <p>Contáctanos en Whatsapp: +593 xxxxxxxxx</p>
        </div> 
      </footer>
      <p style={{textAlign:'center', fontSize: '0.8em', margin: '10px 0'}}>Copyright © 2025 Vivian's Peluquería. Todos los Derechos Reservados.</p>
    </BrowserRouter>
    </>
  );
}

export default App;
