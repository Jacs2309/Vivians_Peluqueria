import NavBarAdmin from './navBarAdmin';
import Aside from './aside';

import local from '../assets/inicio/local.png'
import corte from '../assets/inicio/corte.png'
import tratamiento from '../assets/inicio/tratamiento.png'

const InicioA = () =>{
    return (
        <>
        <NavBarAdmin/>
        <main>
            <section>
            <div className="box" style={{display:'flex', justifyContent:'center'}}>
                <div style={{paddingRight:'3vh'}}>
                <h2>Bienvenido</h2>
                <p>Te damos la bienvenida a Vivian’s Peluquería, el salón de belleza favorito en Terracota y todo el valle. 
                    Nos enorgullece ofrecer un servicio de calidad gracias a nuestro equipo de profesionales con años de experiencia, 
                    listos para brindarte los mejores cortes, tratamientos y cuidados que tu cabello merece.</p>
                </div>
                <img alt="Imagen bienvenida" src={local} style={{height:'30vh', width:'45vh', paddingRight:'8vh'}}/>
            </div>

            <h3>Sobre Nosotros</h3>

            <div className="box" style={{display:'flex', justifyContent:'center'}}>
                <img alt="Imagen cortes de cabello" src={corte} style={{height:'30vh', width:'45vh', paddingLeft:'8vh'}}/>
                <div style={{paddingLeft:'3vh'}}>
                <h4>Cortes de Cabello</h4>
                <p>En Vivian’s Peluquería realizamos cortes modernos, clásicos y personalizados, pensados para resaltar tu estilo y adaptarnos a tus preferencias. 
                    Nuestro equipo se asegura de que salgas sintiéndote renovado y con la confianza que solo un buen corte puede dar.</p>
                </div>
                
            </div>

            <div className="box" style={{display:'flex', justifyContent:'center'}}>
                <div style={{paddingRight:'3vh'}}>
                <h4>Tratamiento Capilar</h4>
                <p>Ofrecemos tratamientos capilares profesionales diseñados para revitalizar, hidratar y proteger tu cabello. Desde alisados hasta nutrición profunda, 
                    cuidamos cada hebra para que tu cabello luzca más saludable, brillante y lleno de vida.</p>
                </div>
                <img alt="Imagen tratamiento capilar" src={tratamiento} style={{height:'30vh', width:'45vh', paddingRight:'8vh'}}/>
            </div>
            </section>
            <Aside/>            
        </main>
        </>
    );
}
export default InicioA;
