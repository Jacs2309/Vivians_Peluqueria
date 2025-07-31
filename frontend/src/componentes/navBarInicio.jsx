import { Link } from "react-router-dom"
const NavBarInicio = ()=>{
    return(
        <nav>
            <div>
                <ul className="nav-menu">
                    <li className="nav-item">
                    <Link to={'/vivians/inicio'}>Inicio</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={'/vivinas/iniciarsesion'}>Iniciar sesion</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={'/vivians/registrar'}>Registrarse</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
export default NavBarInicio;