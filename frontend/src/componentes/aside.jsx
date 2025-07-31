import esmalte from '../assets/inicio/esmalte.png'
import sh from '../assets/inicio/shampoo.jpeg'
import uñas from '../assets/inicio/uñas.jpg'
import acond from '../assets/inicio/acond.jpeg'
import tinte from '../assets/inicio/tinte.jpeg'
import aceite from '../assets/inicio/aceite.png'


const Aside = () =>{
    return (
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
    );
}
export default Aside