import { Link } from 'react-router-dom';

const NavBarAdmin = ()=>{
    return(
        <nav>
            <div>
                <ul className="nav-menu">
                    <li className="nav-item">
                    <Link to={'/vivians/inicio'}>Cerrar sesion</Link>
                    </li>
                    <li className="nav-item">
                    <Link to={'/vivians/admin'}>Inicio</Link>
                    </li>
                    <li className="nav-item">
                    <Link to={'/vivians/admin/inventario'}>Inventario</Link>
                    </li>
                    <li className="nav-item">
                    <Link to={'/vivians/admin/users'}>Gestion de usuarios</Link>
                    </li>
                    <li className="nav-item">
                    <Link to={'/vivians/admin/notificaciones'}>Notificaciones</Link>
                    </li>
                    <li className="nav-item">
                    <Link to={'/vivians/admin/usoprod'}>Uso de productos</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
export default NavBarAdmin