import { useEffect } from 'react';

import Inicio from '../../../web/presentacion/Inicio/inicio'
import Header from '../../../web/UI/Navbar/Header'

export default function Route(){

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    return (
    <>

        <Header />
        {/*Seccion de presentación */ }
        <Inicio/>
        

    </>
    )
}
