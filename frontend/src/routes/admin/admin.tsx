import { useEffect } from "react";

import LoginAdministracion from "../../web/app/Login";

export default function Route(){

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


   return (
      <>
  
          {/*Seccion de presentación */ }
          <LoginAdministracion/>
          
  
      </>
   )
}
