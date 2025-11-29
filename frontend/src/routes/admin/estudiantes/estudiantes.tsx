import { useEffect } from 'react';

import Estudiantes from '../../../web/app/Estudiante/Componentes/layout'

export default function Route(){

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    return (
    <>

        {/*Seccion de presentación */ }
        <Estudiantes/>
        

    </>
    )
}
