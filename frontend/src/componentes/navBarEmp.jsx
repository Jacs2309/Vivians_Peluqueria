import { Link } from "react-router-dom";
const NavBarEmp = () =>{
    return(
        <nav>
        <div>
            <ul className="nav-menu">
                <li className="nav-item">
                <Link to={'/vivians/inicio'}>Cerrar sesion</Link>
                </li>
                <li className="nav-item">
                <Link to={'/vivians/empleado'}>Inicio</Link>
                </li>
                <li className="nav-item">
                <Link to={'/vivians/empleado/inventario'}>Inventario</Link>
                </li>
                <li className="nav-item">
                <Link to={'/vivians/empleado/registraruso'}>regsitrar uso Producto</Link>
                </li>
            </ul>
        </div>
    </nav>
    );
}
export default NavBarEmp